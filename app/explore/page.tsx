"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from '../dashboard/_components/StoryItemCard'

function ExploreMore() {


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


    const [offset, setOffset] = useState(0)
    const [storyList, setStoryList] = useState<StoryItemType[]>();

    useEffect(() => {
        GetAllStories(0)
    }, [])




    const GetAllStories = async (offset: number) => {
        const result: any = await db.select().from(StoryData)
            .orderBy(desc(StoryData.id))
            .offset(offset);
        console.log(result)
        setStoryList(result);
    }











    return (
        <div className='min-h-screen p-10 md:px-20 lg:px-40'>
            <h2 className='font-noto-sans-serif font-bold text-4xl text-primary text-center'>সকলের গল্প দেখুন</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                {storyList?.map((item: StoryItemType, index: number) =>
                (
                    <StoryItemCard story={item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ExploreMore