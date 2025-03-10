"use client"
import { Textarea } from '@heroui/react'
import React, { useState } from 'react'

function StorySubjectInput({ userSelection }: any) {

    const [inputValue, setInputValue] = useState("");

    return (
        <div className='text-center'>
            <label className='font-noto-serif-bengali font-bold text-4xl text-primary'>১. গল্পের বিষয়</label>
            {!inputValue && (
                <p className="text-lg font-normal text-gray-500 mt-2">
                    কন্টিনিউ করতে গল্পের বিষয় লিখুন
                </p>
            )}
            <Textarea placeholder='আপনি যে গল্পটি তৈরি করতে চান তার বিষয় লিখুন' size='lg' classNames={
                {
                    input: "resize-y min-h-[230px] text-2xl p-5"
                }
            }
                className='mt-3 w-full max-w-full font-noto-serif-bengali'
                onChange={(e) => userSelection(
                    {
                        fieldValue: e.target.value,
                        fieldName: 'storySubject'
                    }
                )}
            >
            </Textarea>
        </div>
    )
}

export default StorySubjectInput