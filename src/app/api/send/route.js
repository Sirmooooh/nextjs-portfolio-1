import { NextResponse } from "next/server";
const mailgun = require('mailgun-js');

const mg = mailgun.client({
  username: 'api', // Replace with 'api'
  key: process.env.MAILGUN_API_KEY, // Replace with environment variable name
});

const fromEmail = "your-sender-email@example.com"; // Replace with your sender email

export async function POST(req) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: fromEmail,
      to: email,
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
