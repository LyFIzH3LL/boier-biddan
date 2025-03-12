"use client";
import React, { useState } from "react";
import { Button, Input, Textarea, Card } from "@heroui/react";
import axios from "axios";

const AboutUs = () => {
    const [amount, setAmount] = useState<number>(0);

    const handleSubmitFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;
        const nameElement = form.elements.namedItem("name");
        const emailElement = form.elements.namedItem("email");
        const messageElement = form.elements.namedItem("message");

        const name = (nameElement as HTMLInputElement)?.value;
        const email = (emailElement as HTMLInputElement)?.value;
        const message = (messageElement as HTMLTextAreaElement)?.value;

        try {
            const response = await axios.post('/api/send-feedback', {
                name,
                email,
                message,
            });

            if (response.status === 200) {
                alert('Feedback submitted successfully!');
                form.reset();
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSubmitDonation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const nameElement = form.elements.namedItem("donorName");
        const emailElement = form.elements.namedItem("donorEmail");
        const addressElement = form.elements.namedItem("donorAddress");
        const phoneElement = form.elements.namedItem("donorPhone");
        const cityElement = form.elements.namedItem("donorCity");

        const name = (nameElement as HTMLInputElement)?.value;
        const email = (emailElement as HTMLInputElement)?.value;
        const address = (addressElement as HTMLInputElement)?.value;
        const phone = (phoneElement as HTMLInputElement)?.value;
        const city = (cityElement as HTMLInputElement)?.value;


        try {
            const response = await axios.post('/api/donate', {
                amount,
                customer_name: name,
                customer_email: email,
                customer_address: address,
                customer_phone: phone,
                customer_city: city,
            });

            if (response.data.url) {
                console.log("Redirecting to: ", response.data.url);
                window.location.href = response.data.url;
            } else {
                alert("Failed to initiate donation. Please try again.");
            }

        } catch (error) {
            console.error('Error initiating donation:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-10 min-h-screen flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-center text-primary font-noto-sans-serif">আমাদের সম্পর্কে
            </h1>
            <p className="font-noto-sans-serif text-3xl text-primary text-center mt-3">আমাদের উদ্দেশ্য শিশুদের জন্য একটি মজার ওয়েবসাইট বানানো যেখানে তারা AI এর সাহায্যে মজার মজার ছবিসহ গল্প বানিয়ে উপভোগ করতে পারবে এবং বাকি বন্ধুরা কি কি গল্প বানিয়েছে তাও দেখতে পারবে</p>

            <Card className="mt-10 p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center font-noto-sans-serif">আমরা আপনার মতামতকে মূল্য দিই</h2>
                <p className="text-center text-gray-600 font-noto-sans-serif">আপনার চিন্তা ও পরামর্শ আমাদের জানান।</p>
                <form className="mt-5 space-y-4" onSubmit={handleSubmitFeedback}>
                    <Input type="text" placeholder="আপনার নাম" name="name" required />
                    <Input type="email" placeholder="আপনার ইমেইল" name="email" required />
                    <Textarea placeholder="আপনার মতামত" name="message" required />
                    <Button type="submit" className="w-full">মতামত প্রদান করুন</Button>
                </form>
            </Card>
            <Card className="mt-10 p-6 shadow-lg rounded-lg text-center">
                <h2 className="text-2xl font-semibold">আমাদের কে সাহায্য করুন</h2>
                <p className="text-gray-600">আপনাদের প্রতিটি অবদান আমাদের কে অনেক সাহায্য করবে</p>
                <form className="mt-5 space-y-4" onSubmit={handleSubmitDonation}>
                    <Input type="number" placeholder="সাহায্যের পরিমান" name="amount" required onChange={(e) => setAmount(Number(e.target.value))} />
                    <Input type="text" placeholder="আপনার নাম" name="donorName" required />
                    <Input type="email" placeholder="আপনার ইমেইল" name="donorEmail" required />
                    <Input type="text" placeholder="আপনার ঠিকানা" name="donorAddress" required />
                    <Input type="text" placeholder="আপনার শহর" name="donorCity" required />
                    <Input type="tel" placeholder="আপনার ফোন নম্বর" name="donorPhone" required />
                    <Button type="submit" className="w-full">অনুদান দিন</Button>
                </form>
            </Card>
        </div>
    );
};

export default AboutUs;
