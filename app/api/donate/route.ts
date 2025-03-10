import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const shurjopay = require("shurjopay")();

const spEndpoint = process.env.SP_ENDPOINT!;
const spUsername = process.env.SP_USERNAME!;
const spPassword = process.env.SP_PASSWORD!;
const spPrefix = process.env.SP_PREFIX!;
const spReturnUrl = process.env.SP_RETURN_URL!;

shurjopay.config(
    spEndpoint,
    spUsername,
    spPassword,
    spPrefix,
    spReturnUrl
);

export async function POST(req: Request) {
    const { amount, name, email } = await req.json();
    console.log('Received donation data:', { amount, name, email });

    const order_id = uuidv4();

    const paymentData = {
        amount: amount,
        order_id: order_id,
        customer_name: name,
        customer_address: "Dhaka",
        client_ip: "102.324.0.5",
        customer_phone: "01711111111",
        customer_city: "Dhaka",
        customer_post_code: "1000",
        currency: "BDT"
    };

    try {
        return new Promise((resolve, reject) => {
            shurjopay.makePayment(paymentData, (response_data: any) => {
                console.log('ShurjoPay Response:', response_data);

                if (response_data && response_data.checkout_url) {
                    console.log("ShurjoPay Checkout URL:", response_data.checkout_url);
                    resolve(NextResponse.json({ url: response_data.checkout_url }));
                } else {
                    console.error("Failed to initiate payment:", response_data);
                    resolve(NextResponse.json({ error: "Failed to initiate payment" }, { status: 400 }));
                }
            }, (error: any) => {
                console.error("Error initiating payment:", error);
                resolve(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
            });
        });
    } catch (error) {
        console.error("Error initiating donation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}