// app/api/candidates/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/candidates/:id - Get single candidate
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const candidate = await prisma.candidate.findUnique({
      where: { id }
    });
    
    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidate' },
      { status: 500 }
    );
  }
}

// PUT /api/candidates/:id - Update candidate
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    const body = await request.json();
       // Check if candidate exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });
    
    if (!existingCandidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const candidate = await prisma.candidate.update({
      where: { id },
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
    
    return NextResponse.json(candidate);
  } catch (error) {
    console.error('Error updating candidate:', error);
    return NextResponse.json(
      { error: 'Failed to update candidate' , details: error instanceof Error ? error.message : 'Unknown error'  },
      { status: 500 }
    );
  }
}

// DELETE /api/candidates/:id - Delete candidate
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
     // Check if candidate exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });
    
    if (!existingCandidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    await prisma.candidate.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Candidate deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return NextResponse.json(
      { error: 'Failed to delete candidate', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}