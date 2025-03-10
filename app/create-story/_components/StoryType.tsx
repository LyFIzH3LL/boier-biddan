"use cilent"
import Image from 'next/image'
import React, { useState } from 'react'

export interface OptionField {
    label: string,
    value: string,
    imageUrl: string,
    isFree: boolean
}

function StoryType({ userSelection }: any) {


    const OptionList = [
        {
            label: 'গল্পের বই',
            value: 'Story Book',
            imageUrl: '/story.jpg',
            isFree: true
        },

        {
            label: 'শয়নকাল গল্প',
            value: 'Bedtime Story',
            imageUrl: '/bed.jpg',
            isFree: true
        },

        {
            label: 'শিক্ষামূলক গল্প',
            value: 'Educational',
            imageUrl: '/educational.jpg',
            isFree: true
        }
    ]


    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.value);
        userSelection({
            fieldValue: item?.value,
            fieldName: 'storyType'
        })

    }







    return (
        <div className='text-center'>
            <label className='font-noto-serif-bengali font-bold text-4xl text-primary'>২. গল্পের ধরন</label>
            {!selectedOption && (
                <p className="text-lg font-normal text-gray-500 mt-2">
                    কন্টিনিউ করতে আপনার পছন্দের ধরন নির্বাচন করুন
                </p>
            )}
            <div className='grid grid-cols-3 gap-5 mt-3'>
                {OptionList.map((item, index) => (
                    <div key={index} className={`relative grayscale hover:grayscale-0 cursor-pointer p-1
                        ${selectedOption == item.value ? 'grayscale-0 border-2 rounded-3xl border-primary' : 'grayscale'}

                    `}
                        onClick={() => onUserSelect(item)}>
                        <h2 className='absolute bottom-5 text-2xl text-white font-noto-serif-bengali text-center w-full'>{item.label}</h2>
                        <Image key={index} src={item.imageUrl} alt={item.label} width={300} height={500} className='object-cover h-[260px] rounded-3xl w-full max-w-full' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StoryType