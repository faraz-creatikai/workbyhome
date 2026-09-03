import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
 // make sure prisma is configured

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      subject,
      message,
      inquiryType,
      priority,
      supportMethod,
      preferredTime,
    } = body;

    // ✅ Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All required fields are missing" },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    const support = await prisma.contactSupport.create({
      data: {
        name,
        email,
        subject,
        message,
        inquiryType,
        priority,
        supportMethod,
        preferredTime,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Support request submitted successfully",
      data: support,
    });
  } catch (error) {
    console.error("CONTACT SUPPORT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}