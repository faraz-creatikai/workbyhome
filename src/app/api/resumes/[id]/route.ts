// app/api/resumes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  MAX_FILE_SIZE,
  isValidResumeFile,
  saveUploadedFile,
  deleteUploadedFile,
  parseJsonArray,
} from '../_lib';

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/resumes/[id] - Get a single resume
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PUT /api/resumes/[id] - Update a resume (multipart/form-data).
// Files are optional on update: if no new file is sent, the existing one is kept.
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const existing = await prisma.resume.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

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

    // Resume file — replace if a new one was uploaded, otherwise keep the existing one
    let resumeUrl = existing.resumeUrl;
    let resumeFileName = existing.resumeFileName;
    const resumeEntry = formData.get('resume');
    if (resumeEntry && typeof resumeEntry !== 'string') {
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
      resumeUrl = await saveUploadedFile(resumeFile, 'resumes');
      resumeFileName = resumeFile.name;
      await deleteUploadedFile(existing.resumeUrl);
    }

    // Profile photo — replace, remove (removePhoto=true), or keep existing
    let profilePhoto: string | null = existing.profilePhoto;
    const photoEntry = formData.get('profilePhoto');
    const removePhoto = formData.get('removePhoto') === 'true';

    if (photoEntry && typeof photoEntry !== 'string') {
      const photoFile = photoEntry as File;
      if (!photoFile.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Profile photo must be an image' }, { status: 400 });
      }
      if (photoFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Profile photo must be under 5MB' }, { status: 400 });
      }
      profilePhoto = await saveUploadedFile(photoFile, 'photos');
      await deleteUploadedFile(existing.profilePhoto);
    } else if (removePhoto) {
      await deleteUploadedFile(existing.profilePhoto);
      profilePhoto = null;
    }

    const resume = await prisma.resume.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        location,
        profilePhoto,
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
        resumeFileName,
        bio,
        portfolio,
        linkedin,
        github,
        twitter,
        website,
        visibility,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] - Delete a resume
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const existing = await prisma.resume.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    await prisma.resume.delete({ where: { id } });

    // Best-effort cleanup — doesn't block the response either way
    await deleteUploadedFile(existing.resumeUrl);
    await deleteUploadedFile(existing.profilePhoto);

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}