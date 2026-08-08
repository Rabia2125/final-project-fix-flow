import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const repairId = searchParams.get('repairId');

    if (!repairId) {
      return NextResponse.json({ success: false, message: 'Repair ID is required' }, { status: 400 });
    }

    const task = await RepairTask.findOne({ repairId: repairId.trim() });
    if (!task) {
      return NextResponse.json({ success: false, message: 'Repair task not found with this ID' }, { status: 404 });
    }

    return NextResponse.json({ success: true, task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}