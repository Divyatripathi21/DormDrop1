import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    registrationNumber:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: String,
        required:true,
    },
    block:{
        type: Number,
        required:true,
    },
    room:{
      type: Number,
      required:true,
  },
    waitTime:{
        type: Number,
        required:true,
    },
    }, {timestamps: true}
);

const Receiver = mongoose.model('Receiver', receiverSchema);

export default Receiver;