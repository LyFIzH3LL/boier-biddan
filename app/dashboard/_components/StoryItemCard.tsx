import Image from 'next/image'
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from '@heroui/react';
import Link from 'next/link';

type StoryItemType = {
    story: {
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


}

function StoryItemCard({ story }: StoryItemType) {



    return (
        <Link href={'/view-story/' + story?.storyId}>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 hover:scale-105 transition-all cursor-pointer">

                <Image

                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={story?.coverImage || '/placeholder.jpg'}
                    width={500}
                    height={500}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-2xl font-bold">{story?.output?.title}</p>
                        <h1 className='text-black text-sm'>Made by : {story?.userName}</h1>

                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                        Read Now
                    </Button>
                </CardFooter>

            </Card>
        </Link>
    )
}

export default StoryItemCard