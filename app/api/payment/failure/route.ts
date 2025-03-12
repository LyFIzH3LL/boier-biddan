import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const order_id = url.searchParams.get("order_id");

    if (!order_id) return NextResponse.json({ error: "Missing order ID" }, { status: 400 });

    console.log("Payment failed/canceled for Order ID:", order_id);

    return NextResponse.redirect(`${process.env.CLIENT_FAILURE_URL}?order_id=${order_id}`);
}

