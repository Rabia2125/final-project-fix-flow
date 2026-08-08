 import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { taskId, receiveItem, status, beforePhoto, afterPhoto, costEstimate, completionDate, deliveryStatus } = body;

    const task = await RepairTask.findById(taskId);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    if (receiveItem !== undefined) task.receiveItem = receiveItem;
    if (status) task.status = status;
    if (costEstimate !== undefined) task.costEstimate = costEstimate;
    if (completionDate) task.completionDate = completionDate;
    if (deliveryStatus) task.deliveryStatus = deliveryStatus;

    if (beforePhoto) {
      if (!task.beforeRepairPhotos) task.beforeRepairPhotos = [];
      task.beforeRepairPhotos.push(beforePhoto);
    }

    if (afterPhoto) {
      if (!task.afterRepairPhotos) task.afterRepairPhotos = [];
      task.afterRepairPhotos.push(afterPhoto);
    }

    await task.save();

    return NextResponse.json({ success: true, message: 'Repair updated successfully', task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}