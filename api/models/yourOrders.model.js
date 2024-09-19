import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const senderSchema = new mongoose.Schema({
  name: String,
  registrationNumber: String,
  email: String,
  mobileNumber: String,

});

const yourOrdersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  senders: [senderSchema]
});

const YOURORDERS = mongoose.model('YOURORDERS', yourOrdersSchema);

export default YOURORDERS;