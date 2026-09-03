// app/api/companies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/companies - Get all companies
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST /api/companies - Create a new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: {
        name: body.name,
        logo: body.logo || null,
        industry: body.industry || '',
        companySize: body.companySize || '',
        location: body.location || '',
        description: body.description || '',
        email: body.email,
        phone: body.phone || '',
        website: body.website || null,
        foundedYear: body.foundedYear || '',
        openPositions: body.openPositions ?? 0,
        benefits: body.benefits || []
      }
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    );
  }
}