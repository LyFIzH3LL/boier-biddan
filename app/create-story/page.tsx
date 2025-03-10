"use client"
import React, { useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button } from '@heroui/react'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { v4 as uuidv4 } from 'uuid';
import CustomLoader from './_components/CustomLoader'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
    fieldName: string,
    fieldValue: string
}

export interface formaDataType {
    storySubject: string,
    storyType: string,
    imageStyle: string,
    ageGroup: string
}

function CreateStory() {
    const [formData, setFormData] = useState<formaDataType>();
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const notify = (msg: string) => toast(msg);
    const notifyError = (msg: string) => toast.error(msg);
    const [coverImage, setcoverImage] = useState();
    const [warningMessage, setWarningMessage] = useState<string>('');

    const onHandleUserSelection = (data: fieldData) => {
        setFormData((prev: any) => ({
            ...prev,
            [data.fieldName]: data.fieldValue
        }));
        setWarningMessage('');
    }

    const GenerateStory = async () => {

        if (!formData?.storySubject || !formData?.storyType || !formData?.ageGroup || !formData?.imageStyle) {
            setWarningMessage('অনুগ্রহ করে সমস্ত ক্ষেত্র পূর্ণ করুন।');
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = CREATE_STORY_PROMPT
            ?.replace('{ageGroup}', formData?.ageGroup ?? '')
            .replace('{storyType}', formData?.storyType ?? '')
            .replace('{storySubject}', formData?.storySubject ?? '')
            .replace('{imageStyle}', formData?.imageStyle ?? '')

        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT)
            const story = JSON.parse(result?.response.text());

            const imageResp = await axios.post('api/generate-image', {
                prompt: `Add text with title of cartoon boy: ${story?.Title} in bold text for book cover, ${story?.cover?.imagePrompt}`,
            })

            if (imageResp?.data?.image) {
                console.log(imageResp?.data?.image);
                setcoverImage(imageResp?.data?.image);


                const resp = await SaveInDB(result?.response.text(), imageResp?.data?.image);
                console.log(resp);
            } else {
                throw new Error('Image generation failed');
            }

            notify("গল্প তৈরি করা সম্পন্ন হয়েছে")
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            notifyError('সার্ভারে সমস্যা, অনুগ্রহ করে পরে আবার চেষ্টা করুন।')
            setLoading(false);
        }
    }

    const SaveInDB = async (output: string, coverImage: any) => {
        const recordId = uuidv4();
        setLoading(true);
        try {
            const result = await db.insert(StoryData).values({
                storyId: recordId,
                ageGroup: formData?.ageGroup,
                imageStyle: formData?.imageStyle,
                storySubject: formData?.storySubject,
                storyType: formData?.storyType,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                userName: user?.fullName,
                coverImage: coverImage,
                output: JSON.parse(output)
            }).returning({ storyId: StoryData?.storyId })
            setLoading(false);
            return result;
        }
        catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-40'>
            <h2 className='font-extrabold text-[70px] text-primary text-center font-noto-serif-bengali'>আপনার গল্পকে টেক্সট আকারে লিখুন</h2>
            <p className='font-noto-serif-bengali text-2xl text-primary text-center'>আপনার দক্ষতা ও বুদ্ধিমত্তাকে আরো বৃদ্ধি করুন AI দ্বারা, বানান এমন গল্প যা আগে কখনো দেখেনি কেউই</p>

            <div className='flex flex-col gap-20 mt-14'>
                {/* Story Subject*/}
                <StorySubjectInput userSelection={onHandleUserSelection} />
                {/* Story Type*/}
                <StoryType userSelection={onHandleUserSelection} />
                {/* Age Group*/}
                <AgeGroup userSelection={onHandleUserSelection} />
                {/* Image Style */}
                <ImageStyle userSelection={onHandleUserSelection} />
            </div>

            {/* Display warning if fields are missing */}
            {warningMessage && <p className='text-red-500 text-xl text-center'>{warningMessage}</p>}

            <div className='flex justify-end my-10'>
                <Button
                    color='primary'
                    className='p-10 text-2xl font-noto-serif-bengali'
                    disabled={loading || !formData?.storySubject || !formData?.storyType || !formData?.ageGroup || !formData?.imageStyle}
                    onPress={GenerateStory}
                >
                    গল্প তৈরি করুন
                </Button>
            </div>
            <CustomLoader isLoading={loading} />
        </div>
    )
}

export default CreateStory
