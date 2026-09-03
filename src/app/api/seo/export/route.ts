import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


// GET /api/seo/export - Export all SEO data as JSON
export async function GET(request: NextRequest) {
  try {
    const entries = await prisma.seoEntry.findMany({
      orderBy: { pageName: 'asc' },
    });

    const exportData = entries.map(entry => ({
      ...entry,
      keywords: JSON.parse(entry.keywords || '[]'),
    }));

    return NextResponse.json(exportData);
  } catch (error) {
    console.error('Error exporting SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

// POST /api/seo/import - Import SEO data from JSON
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of entries.' },
        { status: 400 }
      );
    }

    const results = await prisma.$transaction(
      data.map((entry: any) => 
        prisma.seoEntry.upsert({
          where: { slug: entry.slug },
          update: {
            ...entry,
            keywords: JSON.stringify(entry.keywords || []),
            id: undefined, // Don't update ID
            createdAt: undefined,
            lastModified: new Date(),
          },
          create: {
            ...entry,
            keywords: JSON.stringify(entry.keywords || []),
            id: undefined, // Let Prisma generate new ID
            createdAt: new Date(),
            lastModified: new Date(),
          },
        })
      )
    );

    return NextResponse.json({
      message: `Imported ${results.length} entries`,
      count: results.length,
    });
  } catch (error) {
    console.error('Error importing SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to import data' },
      { status: 500 }
    );
  }
}