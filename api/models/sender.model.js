import mongoose from 'mongoose';

const senderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    registrationNumber:{   
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber:{
        type: String,
        required:true,
    },
    availabilityTime:{
        type: Number,
        required:true,
    },
    }, {timestamps: true}
);

const Sender = mongoose.model('Sender', senderSchema);

export default Sender;