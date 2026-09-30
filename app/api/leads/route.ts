import { NextRequest, NextResponse } from 'next/server';

// Note: This is an in-memory store. In a real production app, 
// you would use a database (like Firebase or PostgreSQL).
// Leads will reset if the server restarts.
let leads: any[] = [];

export async function GET(req: NextRequest) {
  // Simple check for password in query or header could be added here for extra security
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    const newLead = {
      ...lead,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    leads.unshift(newLead); // Add to the beginning
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    leads = leads.filter(l => l.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  }
}
