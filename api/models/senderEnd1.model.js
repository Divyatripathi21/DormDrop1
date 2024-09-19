import mongoose from 'mongoose';

// Define schema for Receiver object
const receiverSchema = new mongoose.Schema({
    block: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        
    },
    mobileNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    waitTime: {
        type: Number,
        required: true
    }
});

// Define schema for Sender object
const senderSchema = new mongoose.Schema({
    availabilityTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mobileNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
   
});

// Define schema for the data containing both currentReceiver and currentSender
const dataSchema = new mongoose.Schema({
    currentReceiver: receiverSchema,
    currentSender: senderSchema
});

// Create a model for the data schema
const SenderEnd1 = mongoose.model('SenderEnd1', dataSchema);

export default SenderEnd1;
