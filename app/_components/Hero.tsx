"use client";
import { Button, Accordion, AccordionItem } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Hero() {
    const stories = [
        { src: '/story1.jpg', alt: 'story 1', title: 'মজার গল্প তৈরি করুন' },
        { src: '/story2.jpg', alt: 'story 2', title: 'মজার ছবি তৈরি করুন' },
        { src: '/story3.jpg', alt: 'story 3', title: 'নিজের ভাষায় গল্প উপভোগ করুন' }
    ];

    const faqs = [
        {
            question: 'কিভাবে গল্প তৈরি করবো?',
            answer: 'প্রথমে ওয়েবসাইটে একটি অ্যাকাউন্ট খুলবেন, তারপর Create Story-তে গিয়ে আপনার পছন্দমতো প্রম্পট এবং ইমেজ স্টাইল বাছাই করে গল্প বানিয়ে নিজের ড্যাশবোর্ডে দেখতে পারবেন এবং আপনার গল্পও বাকিরা দেখতে পারবে।'
        },
        {
            question: 'গল্প এবং ছবি কিভাবে তৈরি হচ্ছে?',
            answer: 'গল্পের জন্য Gemini Model এবং ছবি জেনারেশনের জন্য Hugging Face-এর Black Forest Labs নামে একটি মডেল ব্যবহার করা হচ্ছে।'
        }
    ];

    return (
        <div className="text-white min-h-screen">
            <div className="px-10 md:px-28 lg:px-44 mt-10 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* First div container - Hero Section */}
                    <div>
                        <h2 className="font-noto-serif-bengali text-primary text-[65px] font-extrabold py-10">
                            মুহূর্তেই জাদুর গল্প তৈরী করুন শিশুদের জন্য
                        </h2>
                        <h5 className="font-noto-serif-bengali text-primary font-light text-[25px]">
                            ছোটদের জন্য তৈরী করুন মজার গল্প যেটি শুধু ছোটদের জন্য তৈরী হবে আলাদা করে
                        </h5>
                        <Link href={'/create-story'}>
                            <Button size="lg" radius="lg" color="primary" className="mt-7 text-2xl p-9 font-semibold">
                                Create Story
                            </Button>
                        </Link>
                    </div>

                    {/* Second div container - Hero Image */}
                    <div>
                        <Image src={'/hero.png'} alt="hero" width={700} height={400} />
                    </div>
                </div>

                {/* Images Side by Side Section */}
                <div className="mt-20">
                    <h3 className="text-6xl font-bold text-center text-primary font-noto-sans-serif mb-20">আমাদের বৈশিষ্ট্যসমূহ</h3>
                    <div className="flex justify-center gap-40">
                        {stories.map((story) => (
                            <div key={story.alt} className="mx-4 text-center">
                                <div className="relative">
                                    <Image
                                        src={story.src}
                                        alt={story.alt}
                                        width={300}
                                        height={100}
                                        className="rounded-lg brightness-50"
                                    />
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-noto-sans-serif font-bold text-center">
                                        {story.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accordion Section */}
                <div className="mt-20">
                    <h3 className="text-6xl font-bold text-center mb-6 text-primary font-noto-sans-serif">সচরাচর জিজ্ঞাসিত প্রশ্ন</h3>
                    <Accordion className="text-lg">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={<span className="text-primary font-noto-sans-serif" style={{ fontSize: '2.5rem' }}>{faq.question}</span>} className="text-4xl p-4">
                                <div className="text-black text-2xl font-noto-sans-serif p-2">
                                    {faq.answer}
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Hero;