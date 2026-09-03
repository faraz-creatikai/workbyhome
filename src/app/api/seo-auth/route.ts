import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // ✅ Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find user in DB
    const user = await prisma.login.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    // ✅ Compare hashed password
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create simple token (you can upgrade to JWT later)
    const token = Buffer.from(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        name : user.name,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      })
    ).toString("base64");

    // ✅ Create the single response object
    const response = NextResponse.json({
      success: true,
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // ✅ Set the token in HTTP cookie securely
    response.cookies.set({
      name: 'seo-auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 24 * 60 * 60, // 1 day
      sameSite: 'lax',
    });

    // ✅ Return the final response
    return response;

  } catch (error) {
    console.error("Auth error:", error);

    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}

// keep this in the same file as your POST handler, below it
export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'seo-auth-token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // same conditional as login — works on http in dev, https in prod
    sameSite: 'lax',
    path: '/', // must match the path used when the cookie was set, or the browser won't clear it
    maxAge: 0,
  });

  return response;
}