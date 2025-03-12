import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const order_id = url.searchParams.get("order_id");
    const name = url.searchParams.get("name");
    const address = url.searchParams.get("address");
    const email = url.searchParams.get("email");
    const phone = url.searchParams.get("phone");
    const city = url.searchParams.get("city");
    const amount = url.searchParams.get("amount");

    if (!order_id) return NextResponse.json({ error: "Missing order ID" }, { status: 400 });

    console.log("Payment successful for Order ID:", order_id);
    console.log("Payment Details:", { name, address, email, phone, city, amount });

    const redirectUrl = `${process.env.CLIENT_SUCCESS_URL}?order_id=${order_id}&name=${name}&address=${address}&email=${email}&phone=${phone}&city=${city}&amount=${amount}`;
    console.log("Redirecting to:", redirectUrl);

    // Redirect to the client success URL with the parameters
    return NextResponse.redirect(redirectUrl);
}
