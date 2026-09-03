import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


// GET /api/seo/[id] - Get single entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await prisma.seoEntry.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json(
        { error: 'SEO entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...entry,
      keywords: JSON.parse(entry.keywords || '[]'),
    });
  } catch (error) {
    console.error('Error fetching SEO entry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO entry' },
      { status: 500 }
    );
  }
}

// PUT /api/seo/[id] - Update entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Calculate new SEO score
    const seoScore = calculateSEOScore(body);
const { id: _, createdAt, ...safeData } = body;
    const entry = await prisma.seoEntry.update({
      where: { id },
      data: {
        ...safeData,
        keywords: JSON.stringify(body.keywords || []),
        seoScore,
      },
    });

    return NextResponse.json({
      ...entry,
      keywords: JSON.parse(entry.keywords || '[]'),
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'SEO entry not found' },
        { status: 404 }
      );
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug or URL already exists' },
        { status: 409 }
      );
    }
    console.error('Error updating SEO entry:', error);
    return NextResponse.json(
      { error: 'Failed to update SEO entry' },
      { status: 500 }
    );
  }
}

// DELETE /api/seo/[id] - Delete entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.seoEntry.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'SEO entry deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'SEO entry not found' },
        { status: 404 }
      );
    }
    console.error('Error deleting SEO entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete SEO entry' },
      { status: 500 }
    );
  }
}

function calculateSEOScore(entry: any): number {
  let score = 0;
  
  if (entry.metaTitle?.length >= 50 && entry.metaTitle?.length <= 60) score += 25;
  else if (entry.metaTitle?.length > 0) score += 15;
  
  if (entry.metaDescription?.length >= 150 && entry.metaDescription?.length <= 160) score += 25;
  else if (entry.metaDescription?.length > 0) score += 15;
  
  if (entry.keywords?.length > 0) score += 15;
  if (entry.ogTitle && entry.ogDescription) score += 15;
  if (entry.twitterTitle && entry.twitterDescription) score += 15;
  
  if (entry.metaTitle?.length > 70) score -= 10;
  if (entry.metaDescription?.length > 170) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}