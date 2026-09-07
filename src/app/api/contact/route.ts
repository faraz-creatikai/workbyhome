import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, description } = await req.json();

    // ✅ Validation
    if (!name || !email || !description) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ✅ Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        message: description,
      },
    });

    // ✅ Send email to admin
    await resend.emails.send({
      from: `EstateAI <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `,
    });

    // ✅ Send confirmation email to user
    await resend.emails.send({
      from: `EstateAI <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for contacting us! 🙌</p>
        <p>We’ve received your message and will reply within 24 hours.</p>
        <p>Best regards,<br/>EstateAI Team</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      id: contact.id,
    });

  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { message: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [messages, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // Make sure you have createdAt in your Prisma schema
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      messages,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Contact GET API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}




export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      );
    }

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Contact DELETE API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}