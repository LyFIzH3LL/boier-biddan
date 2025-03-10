import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Make sure all fields are present
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // Your Gmail
        pass: process.env.EMAIL_PASS,  // Your App Password
      },
    });

    // Sending email with your Gmail address as "from"
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Your Gmail address (as "from")
      to: process.env.FEEDBACK_EMAIL, // Your feedback email
      subject: "New Feedback",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,  // Set the "Reply-To" header to the user's email
    });

    return NextResponse.json({ message: "Feedback sent successfully" }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Email sending failed:", err.message);
    return NextResponse.json(
      { error: "Failed to send email", details: err.message },
      { status: 500 }
    );
  }
}
