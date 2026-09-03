// app/api/candidates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/candidates - Get all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

// POST /api/candidates - Create a new candidate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const candidate = await prisma.candidate.create({
      data: {
        name: body.name,
        image: body.image || null,
        currentCompany: body.currentCompany || '',
        role: body.role,
        location: body.location || '',
        description: body.description || '',
        email: body.email,
        phone: body.phone || '',
        experience: body.experience || '',
        expectedSalary: body.expectedSalary || '',
        resumeUrl: body.resumeUrl || null,
        skills: body.skills || []
      }
    });
    
    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error('Error creating candidate:', error);
    return NextResponse.json(
      { error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}