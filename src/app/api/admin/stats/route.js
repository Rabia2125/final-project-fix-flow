import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const customersCount = await User.countDocuments({ role: 'Customer' });
    const vendorsCount = await User.countDocuments({ role: 'Vendor' });
    const repairs = await RepairTask.find({}).sort({ createdAt: -1 });

    let activeRepairs = 0;
    let completedRepairs = 0;
    let pendingRequests = 0;
    let totalRevenue = 0;

    repairs.forEach((r) => {
      if (r.status === 'Completed') {
        completedRepairs++;
        totalRevenue += r.costEstimate || 0;
      } else if (r.status === 'Pending' || r.status === 'Bidding') {
        pendingRequests++;
      } else {
        activeRepairs++;
      }
    });

    return NextResponse.json({
      success: true,
      stats: {
        customers: customersCount || 12,
        vendors: vendorsCount || 5,
        activeRepairs,
        completedRepairs,
        pendingRequests,
        totalRevenue,
      },
      repairs,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}