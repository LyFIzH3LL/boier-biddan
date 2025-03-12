import { NextResponse } from "next/server";
import { shurjopay_config } from "@/shurjopay_config";

const MSG_PAYMENT_VERIFY_FAILED = "Payment verification failed";

async function authenticate() {
    try {
        const response = await fetch(`${shurjopay_config.SP_ENDPOINT}/api/get_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: shurjopay_config.SP_USERNAME,
                password: shurjopay_config.SP_PASSWORD,
            }),
        });

        if (!response.ok) throw new Error("Merchant authentication failure");
        return await response.json();
    } catch (error) {
        console.error("Authentication Error:", error);
        throw new Error("Merchant authentication failure");
    }
}

export async function POST(req: Request) {
    try {
        const { order_id } = await req.json();
        if (!order_id) return NextResponse.json({ error: "Missing order ID" }, { status: 400 });

        const { token, token_type } = await authenticate();

        const response = await fetch(`${shurjopay_config.SP_ENDPOINT}/api/verification`, {
            method: "POST",
            headers: {
                authorization: `${token_type} ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_id }),
        });

        if (!response.ok) throw new Error(MSG_PAYMENT_VERIFY_FAILED);
        const verificationResult = await response.json();

        return NextResponse.json(verificationResult);
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: MSG_PAYMENT_VERIFY_FAILED }, { status: 500 });
    }
}
