"use client"
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import StoryPages from '../_components/StoryPages';
import BookCoverPage from '../_components/BookCoverPage';
function ViewStory({ params }: any) {

    const [story, setStory] = useState<any>();



    useEffect(() => {
        console.log(params.id);
        getStory()
    }, [])





    const getStory = async () => {
        const result = await db.select().from(StoryData)
            .where(eq(StoryData.storyId, params.id))
        console.log(result)
        setStory(result[0]);
    }



    return (
        <div className='p-10 md:px-20 lg:px-40 flex items-center justify-center flex-col min-h-screen'>
            <h2 className='font-bold text-center text-4xl p-10 bg-primary text-white'>{story?.output?.title}</h2>


            {/*@ts-ignore*/}
            <HTMLFlipBook width={500} height={500} showCover={true} className='mt-10'>


                <div>
                    <BookCoverPage story={story} />
                </div>

                {
                    [...Array(story?.output?.chapters?.length)].map((item, index) => (
                        <div key={index} className='bg-white p-10 border'>
                            <StoryPages storyChapter={story?.output?.chapters[index]} />
                        </div>
                    ))
                }





            </HTMLFlipBook>





        </div>
    )
}

export default ViewStory