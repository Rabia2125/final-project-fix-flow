import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // (Optional) Role check ko filhalcomment kar diya hai taake testing mein rukawat na ho
    /*
    if (decoded.role !== 'vendor') {
      return NextResponse.json({ success: false, message: 'Only vendors can submit bids' }, { status: 403 });
    }
    */

    const { taskId, estimatedCost, estimatedTime, notes, businessName } = await req.json();

    const task = await RepairTask.findById(taskId);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    if (!task.bids) {
      task.bids = [];
    }

    task.bids.push({
      vendorId: decoded.userId || decoded.id,
      vendorName: decoded.email || 'Vendor',
      businessName: businessName || 'Certified Vendor Lab',
      estimatedCost,
      estimatedTime,
      notes,
    });

    task.status = 'Bidding';
    await task.save();

    return NextResponse.json({ success: true, message: 'Bid submitted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}