import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  email: String,
  mobileNumber: String,
  block: Number,
  room: Number,
  waitTime: Number,
});

const dashboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  receivers: [receiverSchema]
});

const DASHBOARD = mongoose.model('DASHBOARD', dashboardSchema);

export default DASHBOARD;