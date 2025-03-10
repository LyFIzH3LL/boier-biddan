"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from './StoryItemCard'
import CustomLoader from '@/app/create-story/_components/CustomLoader'


function UserStoryList() {


    type StoryItemType =
        {
            id: number,
            ageGroup: string,
            imageStyle: string,
            output: [] | any,
            coverImage: string,
            storyId: string,
            storySubject: string,
            userEmail: string,
            userImage: string,
            userName: string,
            title: string
        }









    const { user } = useUser();
    const [storyList, setStoryList] = useState<StoryItemType[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && getUserStory();
    }, [user])

    const getUserStory = async () => {
        setLoading(true);
        const result: any = await db.select().from(StoryData).where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress ?? '')).orderBy(desc(StoryData.id))
        console.log(result);
        setStoryList(result);
        setLoading(false);
    }





    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
                {storyList && storyList.map((item: StoryItemType, index: number) => (
                    <StoryItemCard story={item} key={index}></StoryItemCard>
                ))}
            </div>
            <CustomLoader isLoading={loading} />
        </div>

    )
}

export default UserStoryList