"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

export default function PaymentFailure() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentFailureContent />
        </Suspense>
    );
}

function PaymentFailureContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-gray-800">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 text-center">
                <h2 className="text-3xl font-bold text-red-600 font-noto-sans-serif">পেমেন্ট ব্যর্থ হয়েছে! ❌</h2>
                <p className="text-lg mt-4 font-noto-sans-serif text-primary">অনুগ্রহ করে আবার চেষ্টা করুন</p>
                {orderId && (
                    <p className="mt-2 text-gray-600">
                        <strong>Order ID:</strong> {orderId}
                    </p>
                )}
                <Link href="/">
                    <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
