import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { taskId, rating, review } = await req.json();

    const task = await RepairTask.findById(taskId);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    task.rating = rating;
    task.review = review;
    await task.save();

    return NextResponse.json({ success: true, message: 'Review submitted successfully', task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}