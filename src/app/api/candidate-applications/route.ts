// app/api/candidate-applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { currentCompany: { contains: search, mode: 'insensitive' } },
        { currentRole: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const [applications, total] = await Promise.all([
      prisma.candidateApplication.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.candidateApplication.count({ where })
    ]);
    
    // Parse skills JSON
    const formattedApplications = applications.map(app => ({
      ...app,
      skills: JSON.parse(app.skills)
    }));
    
    return NextResponse.json({
      applications: formattedApplications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}




export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const currentCompany = formData.get('currentCompany') as string;
    const currentRole = formData.get('currentRole') as string;
    const experience = formData.get('experience') as string;
    const expectedSalary = formData.get('expectedSalary') as string;
    const location = formData.get('location') as string;
    const skills = formData.get('skills') as string; // JSON string
    const description = formData.get('description') as string;
    const resume = formData.get('resume') as File | null;
    
    // Validation — currentCompany is intentionally optional (freshers / candidates
    // between jobs shouldn't be blocked from applying)
    if (!fullName || !email || !phone || !currentRole || !experience || !location || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existing = await prisma.candidateApplication.findFirst({
      where: { email }
    });
    
    if (existing) {
      return NextResponse.json(
        { error: 'Application with this email already exists' },
        { status: 409 }
      );
    }
    
    // Handle resume upload
    let resumeUrl = null;
    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create uploads directory if not exists
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'candidates');
      await mkdir(uploadDir, { recursive: true });
      
      // Generate unique filename
      const filename = `${Date.now()}-${resume.name.replace(/\s/g, '-')}`;
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      resumeUrl = `/uploads/candidates/${filename}`;
    }
    
    // Create application
    const application = await prisma.candidateApplication.create({
      data: {
        fullName,
        email,
        phone,
        currentCompany: currentCompany || null,
        currentRole,
        experience,
        expectedSalary: expectedSalary || null,
        location,
        skills: skills || '[]',
        description,
        resumeUrl,
        status: 'pending'
      }
    });
    
    return NextResponse.json({
      success: true,
      application: {
        ...application,
        skills: JSON.parse(application.skills)
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}