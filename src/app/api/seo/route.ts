import { NextRequest, NextResponse } from 'next/server';


import { prisma } from '../../../../lib/prisma';
// GET /api/seo - List all SEO entries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'published' | 'draft' | 'all' | null;
    const search = searchParams.get('search') || '';

    const where = {
      AND: [
        status && status !== 'all' ? { status } : {},
        search ? {
          OR: [
            { pageName: { contains: search, mode: 'insensitive' } },
            { metaTitle: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
      ],
    };

    const entries = await prisma.seoEntry.findMany({
      where,
      orderBy: { lastModified: 'desc' },
    });

    // Calculate stats
    const allEntries = await prisma.seoEntry.findMany();
    const avgScore = allEntries.length > 0 
      ? Math.round(allEntries.reduce((acc:any, e:any) => acc + e.seoScore, 0) / allEntries.length)
      : 0;
    const published = allEntries.filter((e:any) => e.status === 'published').length;
    const needsAttention = allEntries.filter((e:any) => e.seoScore < 60).length;
    const totalKeywords = allEntries.reduce((acc:any, e:any) => {
      const keywords = JSON.parse(e.keywords || '[]');
      return acc + keywords.length;
    }, 0);

    return NextResponse.json({
      entries: entries.map(entry => ({
        ...entry,
        keywords: JSON.parse(entry.keywords || '[]'),
      })),
      stats: {
        avgScore,
        published,
        needsAttention,
        total: allEntries.length,
        totalKeywords,
      },
    });
  } catch (error) {
    console.error('Error fetching SEO entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO entries' },
      { status: 500 }
    );
  }
}

// POST /api/seo - Create new SEO entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Calculate SEO score
    const seoScore = calculateSEOScore(body);

    const entry = await prisma.seoEntry.create({
      data: {
        ...body,
        keywords: JSON.stringify(body.keywords || []),
        seoScore,
        slug: body.slug || generateSlug(body.pageName),
        url: body.url || `/${generateSlug(body.pageName)}`,
      },
    });

    return NextResponse.json({
      ...entry,
      keywords: JSON.parse(entry.keywords),
    }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug or URL already exists' },
        { status: 409 }
      );
    }
    console.error('Error creating SEO entry:', error);
    return NextResponse.json(
      { error: 'Failed to create SEO entry' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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