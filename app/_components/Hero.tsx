"use client";
import { Button, Accordion, AccordionItem } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
    const stories = [
        { src: '/story1.jpg', alt: 'story 1', title: 'মজার গল্প তৈরি করুন' },
        { src: '/story2.jpg', alt: 'story 2', title: 'মজার ছবি তৈরি করুন' },
        { src: '/story3.jpg', alt: 'story 3', title: 'নিজের ভাষায় গল্প উপভোগ করুন' },
        { src: '/story4.jpg', alt: 'story 4', title: 'অন্যদের বানানো গল্প দেখুন ও উপভোগ করুন' }
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

    // React Slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="text-white min-h-screen">
            <div className="px-10 md:px-28 lg:px-44 mt-10 h-full">
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="font-noto-serif-bengali text-primary text-4xl sm:text-5xl md:text-[65px] font-extrabold py-10">
                            মুহূর্তেই জাদুর গল্প তৈরী করুন শিশুদের জন্য
                        </h2>
                        <h5 className="font-noto-serif-bengali text-primary font-light text-2xl sm:text-3xl md:text-[25px]">
                            ছোটদের জন্য তৈরী করুন মজার গল্প যেটি শুধু ছোটদের জন্য তৈরী হবে আলাদা করে
                        </h5>
                        <Link href={'/create-story'}>
                            <Button size="lg" radius="lg" color="primary" className="mt-7 text-xl sm:text-2xl p-7 md:p-9 font-semibold">
                                Create Story
                            </Button>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <Image src={'/hero.png'} alt="hero" width={700} height={400} className="max-w-full h-auto" />
                    </div>
                </div>

                {/* React Slick Carousel Section */}
                <div className="mt-20">
                    <h3 className="text-5xl sm:text-6xl font-bold text-center text-primary font-noto-serif-bengali mb-10">
                        আমাদের বৈশিষ্ট্যসমূহ
                    </h3>
                    <Slider {...settings} className="mx-auto max-w-4xl">
                        {stories.map((story, index) => (
                            <div key={index} className="p-4">
                                <div className="relative">
                                    <Image src={story.src} alt={story.alt} width={400} height={250} className="rounded-lg brightness-50 w-full" />
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center">
                                        {story.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <h3 className="text-5xl sm:text-6xl font-bold text-center mb-6 text-primary font-noto-sans-serif">
                        সচরাচর জিজ্ঞাসিত প্রশ্ন
                    </h3>
                    <Accordion className="text-lg">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={<span className="text-primary font-noto-sans-serif text-xl sm:text-2xl">{faq.question}</span>} className="text-2xl sm:text-3xl p-4">
                                <div className="text-black text-lg sm:text-xl font-noto-sans-serif p-2">
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
