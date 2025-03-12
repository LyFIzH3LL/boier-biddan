"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

export default function PaymentSuccess() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const name = searchParams.get("name");
    const address = searchParams.get("address");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const city = searchParams.get("city");
    const amount = searchParams.get("amount")?.split('?')[0]; // Trim the amount after '?'

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-gray-800">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 text-center">
                <h2 className="text-3xl font-bold text-green-600 font-noto-sans-serif">
                    আপনার অনুদানের জন্য আপনাকে অসংখ্য ধন্যবাদ 🎉
                </h2>
                <p className="text-lg mt-4 font-noto-sans-serif text-primary">
                    "বইয়ের বিদ্যান" টিমের পক্ষ থেকে আপনাদের জন্য রইলো অনেক দোয়া, প্রার্থনা এবং শুভকামনা।
                </p>

                {orderId && <p className="mt-2 text-gray-600"><strong>Order ID:</strong> {orderId}</p>}
                {name && <p className="mt-2 text-gray-600"><strong>Name:</strong> {name}</p>}
                {address && <p className="mt-2 text-gray-600"><strong>Address:</strong> {address}</p>}
                {email && <p className="mt-2 text-gray-600"><strong>Email:</strong> {email}</p>}
                {phone && <p className="mt-2 text-gray-600"><strong>Phone:</strong> {phone}</p>}
                {city && <p className="mt-2 text-gray-600"><strong>City:</strong> {city}</p>}
                {amount && <p className="mt-2 text-gray-600"><strong>Amount:</strong> {amount} BDT</p>}

                <Link href="/">
                    <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
