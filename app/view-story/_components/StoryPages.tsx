"use client";
import React, { useState } from 'react'
import { MdPlayCircleFilled } from 'react-icons/md';
import { chatSession } from '@/config/GeminiAi';
function StoryPages({ storyChapter }: any) {


    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);






    const playSpeech = (text: string) => {
        const synth = window?.speechSynthesis;
        const textToSpeech = new SpeechSynthesisUtterance(text);
        synth.speak(textToSpeech);
    }


    async function translateToBangla(text: string) {
        try {
            if (!text) return;
            setLoading(true);

            const prompt = `Translate the following text to Bangla: ${text}`;
            const response = await chatSession.sendMessage(prompt);

            const translated = response.response.text();
            setTranslatedText(translated || "Translation failed.");
        } catch (error) {
            console.error("Error translating to Bangla:", error);
            setTranslatedText("Translation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }



    return (
        <div>
            <h2 className='text-2xl font-bold text-primary flex justify-start gap-5'>{storyChapter?.chapter_title}
                <span className='text-3xl cursor-pointer' onClick={() => playSpeech(storyChapter?.story)}>
                    <MdPlayCircleFilled></MdPlayCircleFilled>
                </span>
            </h2>

            <button
                className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mt-3"
                onClick={() => translateToBangla(storyChapter?.story)}
                disabled={loading}
            >
                {loading ? "অনুবাদ হচ্ছে..." : "বাংলায় অনুবাদ করুন"}
            </button>
            <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100'>{storyChapter?.story}</p>
            {translatedText && (
                <div className="mt-5 p-5 bg-yellow-100 rounded-lg">
                    <h3 className="text-lg font-semibold">অনুবাদ:</h3>
                    <p className="text-lg">{translatedText}</p>
                </div>
            )}
        </div>
    )
}

export default StoryPages