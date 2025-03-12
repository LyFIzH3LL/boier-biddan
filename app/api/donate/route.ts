import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { shurjopay_config } from "@/shurjopay_config"

// Error Messages
const MSG_AUTH_FAILED = "Merchant authentication failure";
const MSG_PAYMENT_FAILED = "Payment processing failed";
const MSG_PAYMENT_CANCELLED = "Payment cancelled by the user";

// Type Definitions
interface PaymentRequest {
    amount: number;
    currency: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
    customer_city: string;
}

interface PaymentResponse {
    checkout_url: string;
    order_id: string;
    status: string;
    transactionStatus?: string; // Added transactionStatus to handle payment state
}

/**
 * Authenticate with ShurjoPay and get token
 */
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

        if (!response.ok) throw new Error(MSG_AUTH_FAILED);
        return await response.json();
    } catch (error) {
        console.error("Authentication Error:", error);
        throw new Error(MSG_AUTH_FAILED);
    }
}

/**
 * Handles the payment initiation request
 */
export async function POST(req: Request) {
    try {
        const { amount, customer_name, customer_email, customer_address, customer_phone, customer_city } = await req.json();

        console.log("Received donation data:", { amount, customer_name, customer_email, customer_address, customer_phone, customer_city });

        const order_id = uuidv4();
        const ipResponse = await fetch("https://checkip.amazonaws.com/");
        const client_ip = (await ipResponse.text()).trim();

        // Authenticate with ShurjoPay
        const { token, token_type, store_id } = await authenticate();

        // Payment data, including all required fields
        const paymentData = {
            amount,
            prefix: shurjopay_config.SP_PREFIX, // Prefix added
            currency: "BDT",
            customer_name,
            customer_email,
            customer_address, // Added address
            customer_phone, // Added phone number
            customer_city, // Added city
            store_id,
            token,
            client_ip,
            return_url: `${shurjopay_config.SP_RETURN_URL}/success?order_id=${order_id}&name=${customer_name}&email=${customer_email}&phone=${customer_phone}&city=${customer_city}&amount=${amount}`,
            cancel_url: `${shurjopay_config.SP_RETURN_URL}/failure?order_id=${order_id}&name=${customer_name}&email=${customer_email}&phone=${customer_phone}&city=${customer_city}&amount=${amount}`,
            order_id,
        };

        // Make payment request to ShurjoPay
        const response = await fetch(`${shurjopay_config.SP_ENDPOINT}/api/secret-pay`, {
            method: "POST",
            headers: {
                authorization: `${token_type} ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) throw new Error(MSG_PAYMENT_FAILED);

        const paymentResponse: PaymentResponse = await response.json();

        // Debugging: Log the response to verify status
        console.log("Payment Response:", paymentResponse);

        if (!paymentResponse.checkout_url) {
            console.error("ShurjoPay Error:", paymentResponse);
            return NextResponse.json({ error: MSG_PAYMENT_FAILED }, { status: 400 });
        }

        // Handle different transaction statuses
        if (paymentResponse.transactionStatus === 'Failed') {
            console.error("Payment failed, redirecting to failure page.");
            return NextResponse.redirect(paymentData.cancel_url); // Redirect to the cancel URL
        } else if (paymentResponse.transactionStatus === 'Initiated') {
            // If the payment is initiated, don't redirect yet. You may want to wait for confirmation.
            console.log("Payment initiated, redirecting to the checkout page.");
            return NextResponse.json({ url: paymentResponse.checkout_url });
        } else {
            // Default to success page for any other status (you can adjust based on your logic)
            return NextResponse.redirect(paymentData.return_url); // Proceed with the success URL
        }
    } catch (error) {
        console.error("Payment Error:", error);
        return NextResponse.json({ error: MSG_PAYMENT_FAILED }, { status: 500 });
    }
}

/**
 * Handle the failure page when user cancels the payment.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const order_id = searchParams.get("order_id");

        if (!order_id) {
            return NextResponse.json({ error: MSG_PAYMENT_FAILED }, { status: 400 });
        }

        console.log("Payment was cancelled. Redirecting to failure page...");
        return NextResponse.redirect(`${shurjopay_config.SP_RETURN_URL}/failure?order_id=${order_id}`);
    } catch (error) {
        console.error("Error handling failure:", error);
        return NextResponse.json({ error: MSG_PAYMENT_FAILED }, { status: 500 });
    }
}
