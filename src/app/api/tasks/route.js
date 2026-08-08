import dbConnect from '@/lib/mongodb';
import RepairTask from '@/models/RepairTask'; // Yahan RepairTask import karein (file name ke mutabiq)
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    await dbConnect();
    
    const token = req.cookies.get('token')?.value;
    let customerId = null;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      customerId = decoded.userId;
    }

    const tasks = customerId 
      ? await RepairTask.find({ customer: customerId }).sort({ createdAt: -1 }) 
      : await RepairTask.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { title, deviceType, description } = await req.json();

    const token = req.cookies.get('token')?.value;
    let customerId = null;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      customerId = decoded.userId;
    }

    const aiDiagnosis = `AI Analysis for ${deviceType}: Based on issue "${description}", check for loose internal connectors or software glitch. Recommended to run professional diagnostics.`;

    const newTask = await RepairTask.create({
      title,
      deviceType,
      description,
      aiDiagnosis,
      customer: customerId || undefined, // Agar customer ID token mein na ho toh schema validation handle kar sake
      status: 'Pending',
    });

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}