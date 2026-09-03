// app/api/candidate-applications/stats/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';


export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [
      total,
      pending,
      approved,
      rejected,
      todayCount
    ] = await Promise.all([
      prisma.candidateApplication.count(),
      prisma.candidateApplication.count({ where: { status: 'pending' } }),
      prisma.candidateApplication.count({ where: { status: 'approved' } }),
      prisma.candidateApplication.count({ where: { status: 'rejected' } }),
      prisma.candidateApplication.count({
        where: {
          submittedAt: {
            gte: today
          }
        }
      })
    ]);
    
    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      today: todayCount
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}