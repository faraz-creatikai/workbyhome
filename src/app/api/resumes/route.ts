// app/api/resumes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  MAX_FILE_SIZE,
  isValidResumeFile,
  saveUploadedFile,
  parseJsonArray,
} from './_lib';

const prisma = new PrismaClient();

// GET /api/resumes - list all submitted resumes
export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST /api/resumes - submit a new candidate resume (multipart/form-data)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = (formData.get('firstName') as string) || '';
    const lastName = (formData.get('lastName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const location = (formData.get('location') as string) || '';
    const jobTitle = (formData.get('jobTitle') as string) || '';
    const category = (formData.get('category') as string) || '';
    const experience = (formData.get('experience') as string) || '';
    const availability = (formData.get('availability') as string) || '';
    const salaryMin = (formData.get('salaryMin') as string) || '';
    const salaryMax = (formData.get('salaryMax') as string) || '';
    const bio = (formData.get('bio') as string) || '';
    const portfolio = (formData.get('portfolio') as string) || '';
    const linkedin = (formData.get('linkedin') as string) || '';
    const github = (formData.get('github') as string) || '';
    const twitter = (formData.get('twitter') as string) || '';
    const website = (formData.get('website') as string) || '';
    const visibility = (formData.get('visibility') as string) || 'recruiters';

    const workType = parseJsonArray(formData.get('workType'));
    const skills = parseJsonArray(formData.get('skills'));
    const languages = parseJsonArray(formData.get('languages'));

    // Required-field validation mirrors each step of the candidate-facing form
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !location.trim()) {
      return NextResponse.json(
        { error: 'First name, last name, email, and location are required' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    if (!jobTitle.trim() || !category.trim() || !experience.trim()) {
      return NextResponse.json(
        { error: 'Job title, category, and experience level are required' },
        { status: 400 }
      );
    }
    if (skills.length === 0) {
      return NextResponse.json({ error: 'Add at least one skill' }, { status: 400 });
    }

    // Resume file — required
    const resumeEntry = formData.get('resume');
    if (!resumeEntry || typeof resumeEntry === 'string') {
      return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
    }
    const resumeFile = resumeEntry as File;

    if (!isValidResumeFile(resumeFile)) {
      return NextResponse.json(
        { error: 'Resume must be a PDF, DOC, or DOCX file' },
        { status: 400 }
      );
    }
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Resume must be under 5MB' }, { status: 400 });
    }

    // Profile photo — optional
    const photoEntry = formData.get('profilePhoto');
    const photoFile = photoEntry && typeof photoEntry !== 'string' ? (photoEntry as File) : null;

    if (photoFile) {
      if (!photoFile.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Profile photo must be an image' }, { status: 400 });
      }
      if (photoFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Profile photo must be under 5MB' }, { status: 400 });
      }
    }

    const resumeUrl = await saveUploadedFile(resumeFile, 'resumes');
    const profilePhotoUrl = photoFile ? await saveUploadedFile(photoFile, 'photos') : null;

    const resume = await prisma.resume.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        location,
        profilePhoto: profilePhotoUrl,
        jobTitle,
        category,
        experience,
        workType,
        availability,
        salaryMin,
        salaryMax,
        skills,
        languages,
        resumeUrl,
        resumeFileName: resumeFile.name,
        bio,
        portfolio,
        linkedin,
        github,
        twitter,
        website,
        visibility,
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { error: 'Failed to submit resume' },
      { status: 500 }
    );
  }
}