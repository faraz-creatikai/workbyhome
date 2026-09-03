// app/api/candidate-applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

import { unlink } from 'fs/promises';
import { join } from 'path';


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    
    const application = await prisma.candidateApplication.findUnique({
      where: { id }
    });
    
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ...application,
      skills: JSON.parse(application.skills)
    });
    
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}


// update api (approve / reject)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const body = await request.json();
    const { status, rejectionReason, reviewedBy } = body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    if (status === 'rejected' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }
    
    const updateData: any = {
      status,
      reviewedAt: new Date(),
      reviewedBy: reviewedBy || 'Admin'
    };
    
    if (status === 'rejected') {
      updateData.rejectionReason = rejectionReason;
    }
    
    const application = await prisma.candidateApplication.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json({
      success: true,
      application: {
        ...application,
        skills: JSON.parse(application.skills)
      }
    });
    
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// delete api

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
   const { id } = await context.params;
  try {
     

    const application = await prisma.candidateApplication.findUnique({
      where: { id }
    });
    
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    // Delete resume file if exists
    if (application.resumeUrl) {
      try {
        const filepath = join(process.cwd(), 'public', application.resumeUrl);
        await unlink(filepath);
      } catch (e) {
        console.log('Resume file not found or already deleted');
      }
    }
    
    await prisma.candidateApplication.delete({
      where: { id}
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}