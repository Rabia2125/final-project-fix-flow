import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { taskId, bidId } = await req.json();

    const task = await RepairTask.findById(taskId);
    if (!task) return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });

    task.bids = task.bids.map((bid) => {
      if (bid._id.toString() === bidId) {
        return { ...bid, status: 'Accepted' };
      } else {
        return { ...bid, status: 'Rejected' };
      }
    });

    const acceptedBid = task.bids.find(b => b._id.toString() === bidId);

    task.assignedVendor = acceptedBid.vendorId;
    task.status = 'Assigned';
    task.repairId = `REP-${Math.floor(10000 + Math.random() * 90000)}`;

    await task.save();

    return NextResponse.json({ success: true, message: 'Bid accepted and vendor assigned', repairId: task.repairId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}