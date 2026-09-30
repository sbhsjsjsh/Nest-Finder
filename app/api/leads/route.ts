import { NextRequest, NextResponse } from 'next/server';
import { leadsCollection } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const snapshot = await leadsCollection.orderBy('timestamp', 'desc').get();
    const leads = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    const newLead = {
      ...lead,
      timestamp: new Date().toISOString(),
    };
    await leadsCollection.add(newLead);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await leadsCollection.doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 400 });
  }
}
