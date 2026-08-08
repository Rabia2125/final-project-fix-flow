import mongoose from 'mongoose';

const RepairTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a repair title'],
  },
  deviceType: {
    type: String,
    required: [true, 'Please specify the device type'],
  },
  category: {
    type: String,
    default: 'General',
  },
  description: {
    type: String,
    required: [true, 'Please provide a description of the issue'],
  },
  deliveryOption: {
    type: String,
    default: 'Pickup',
  },
  image: {
    type: String,
  },
  repairId: {
    type: String,
  },
  receiveItem: {
    type: Boolean,
    default: false,
  },
  beforeRepairPhotos: [{
    type: String,
  }],
  afterRepairPhotos: [{
    type: String,
  }],
  costEstimate: {
    type: Number,
    default: 0,
  },
  customerCostApproval: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  completionDate: {
    type: Date,
  },
  deliveryStatus: {
    type: String,
    enum: ['Not Dispatched', 'Out for Delivery', 'Delivered', 'Ready for Pickup'],
    default: 'Not Dispatched',
  },
  status: {
    type: String,
    enum: ['Pending', 'Bidding', 'Assigned', 'Received', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  aiDiagnosis: {
    type: String,
  },
  // --- New Customer Review Fields ---
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
  bids: [{
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vendorName: String,
    businessName: String,
    estimatedCost: Number,
    estimatedTime: String,
    notes: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RepairTask || mongoose.model('RepairTask', RepairTaskSchema);