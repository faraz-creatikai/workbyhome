import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, description } = await req.json();

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const demoRequest = await prisma.demoRequest.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        message: description || null,
        source: "chatbot"
      }
    });

    // Send email to admin
    await resend.emails.send({
      from: `EstateAI <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Demo Request: ${name}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${description || 'N/A'}</p>
      `
    });

    // Send confirmation to user
    await resend.emails.send({
      from: `EstateAI <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Your Demo Request is Confirmed",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for your interest in EstateAI!</p>
        <p>We've received your demo request and will contact you within 24 hours.</p>
        <p>Best regards,<br>EstateAI Team</p>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Demo request submitted successfully",
      id: demoRequest.id
    });

  } catch (error) {
    console.error('Demo submission error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to submit demo request" },
      { status: 500 }
    );
  }
}