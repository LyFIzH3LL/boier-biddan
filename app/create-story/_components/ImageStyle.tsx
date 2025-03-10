import Image from "next/image";
import React, { useState } from "react";
import { OptionField } from "./StoryType";

function ImageStyle({ userSelection }: any) {
    const OptionList = [
        {
            label: "3D কার্টুন",
            value: "3D Cartoon",
            imageUrl: "/3d.jpg",
            isFree: true,
        },
        {
            label: "পেপার কাট",
            value: "Paper Cut",
            imageUrl: "/papercut.jpg",
            isFree: true,
        },
        {
            label: "জল রং",
            value: "Water Color",
            imageUrl: "/watercolor.jpg",
            isFree: true,
        },
        {
            label: "পিক্সেল স্টাইল",
            value: "Pixel Style",
            imageUrl: "/pixel.jpg",
            isFree: true,
        },
    ];

    const [selectedOption, setSelectedOption] = useState<string>();

    const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.value);
        userSelection({
            fieldValue: item?.value,
            fieldName: "imageStyle",
        });
    };

    return (
        <div className="text-center">
            <label className="font-noto-serif-bengali font-bold text-4xl text-primary">
                ৪. ছবির ধরন (একটি নির্বাচন করুন)
            </label>

            {!selectedOption && (
                <p className="text-lg font-normal text-gray-500 mt-2">
                    পরবর্তী ধাপে যেতে হলে একটি ধরন নির্বাচন করুন
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-3">
                {OptionList.map((item, index) => (
                    <div
                        key={index}
                        className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 transition-all duration-300
                            ${selectedOption === item.value
                                ? "grayscale-0 border-2 rounded-3xl border-primary"
                                : "grayscale"
                            }
                        `}
                        onClick={() => onUserSelect(item)}
                    >

                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl">
                            <h2 className="text-2xl text-white font-noto-serif-bengali text-center">
                                {item.label}
                            </h2>
                        </div>

                        <Image
                            key={index}
                            src={item.imageUrl}
                            alt={item.label}
                            width={500}
                            height={700}
                            className="object-cover h-[180px] md:h-[220px] rounded-3xl w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageStyle;
