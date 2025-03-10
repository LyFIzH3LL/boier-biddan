import Image from "next/image";
import React, { useState } from "react";
import { OptionField } from "./StoryType";

function AgeGroup({ userSelection }: any) {
    const OptionList = [
        {
            label: "০-২ বছর",
            value: "0-2 years",
            imageUrl: "/2yearsold.jpg",
            isFree: true,
        },
        {
            label: "৩-৫ বছর",
            value: "3-5 years",
            imageUrl: "/5yearsold.jpg",
            isFree: true,
        },
        {
            label: "৬-৮ বছর",
            value: "6-8 years",
            imageUrl: "/8yearsold.jpg",
            isFree: true,
        },
    ];

    const [selectedOption, setSelectedOption] = useState<string>();

    const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.value);
        userSelection({
            fieldValue: item?.value,
            fieldName: "ageGroup",
        });
    };

    return (
        <div className="text-center">
            <label className="font-noto-serif-bengali font-bold text-4xl text-primary">
                ৩. বয়সের কোঠা (একটি নির্বাচন করুন)
            </label>

            {!selectedOption && (
                <p className="text-lg font-normal text-gray-500 mt-2">
                    পরবর্তী ধাপে যেতে হলে একটি বয়সের কোঠা নির্বাচন করুন
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
                            width={300}
                            height={500}
                            className="object-cover h-[180px] md:h-[220px] rounded-3xl w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AgeGroup;
