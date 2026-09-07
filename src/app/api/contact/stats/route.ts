import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get beginning of today for the "Today" stat
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [total, today] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: startOfToday,
          },
        },
      }),
    ]);

    return NextResponse.json({
      total,
      today,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}