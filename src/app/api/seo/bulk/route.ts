import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


// POST /api/seo/bulk - Bulk operations (delete, publish, draft)
export async function POST(request: NextRequest) {
  try {
    const { operation, ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'No IDs provided' },
        { status: 400 }
      );
    }

    switch (operation) {
      case 'delete':
        await prisma.seoEntry.deleteMany({
          where: { id: { in: ids } },
        });
        return NextResponse.json({ message: `${ids.length} entries deleted` });

      case 'publish':
        await prisma.seoEntry.updateMany({
          where: { id: { in: ids } },
          data: { status: 'published' },
        });
        return NextResponse.json({ message: `${ids.length} entries published` });

      case 'draft':
        await prisma.seoEntry.updateMany({
          where: { id: { in: ids } },
          data: { status: 'draft' },
        });
        return NextResponse.json({ message: `${ids.length} entries set to draft` });

      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}