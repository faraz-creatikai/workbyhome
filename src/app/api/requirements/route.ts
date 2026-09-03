import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET → Fetch All Requirements
export async function GET() {
  try {
    const requirements = await prisma.requirement.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: requirements,
      count: requirements.length,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch requirements" },
      { status: 500 }
    );
  }
}

// POST → Create Requirement
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      requirementType,
      jobType,
      jobRole,
      city,
      location,
      minSalary,
      maxSalary,
      name,
      contactNumber,
      email,
      description,
    } = body;

    // ✅ Basic Validation (same as frontend)
    if (
      !jobType ||
      !jobRole ||
      !city ||
      !location ||
      !minSalary ||
      !maxSalary ||
      !name ||
      !contactNumber ||
      !email
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields are missing" },
        { status: 400 }
      );
    }

    // ✅ Create in DB
    const requirement = await prisma.requirement.create({
      data: {
        requirementType,
        jobType,
        jobRole,
        city,
        location,
        minSalary: parseInt(minSalary),
        maxSalary: parseInt(maxSalary),
        name,
        contactNumber,
        email,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      data: requirement,
      message: "Requirement created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}