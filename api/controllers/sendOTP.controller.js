import nodemailer from 'nodemailer';
import OTP from '../models/otp.model.js';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
dotenv.config();
// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  }
});

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Controller function to send OTP through email
export const sendotp = async (req, res, next) => {
  const { email } = req.body;


  if(!email ||email==='')
  next(errorHandler(606, 'email is required'));
  
  const otp = generateOTP();

  const otpDocument = new OTP({
    email,
    otp,
  });



  // Email message options
  const mailOptions = {
    from:  process.env.EMAIL,
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}`,
  };

  // Send email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, error: 'Failed to send OTP' });
    } else {
      // otpDocument.save();
      console.log('Email sent: ' + info.response);
      res.send({ success: true, otp: otp });
    }
  });
};



export const verifyuser = async (req, res, next) => {
  try {
    const {regNum}=req.body;
 
    const username=regNum;
    
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(403, 'User not found'));
    }


    
    const otp = generateOTP();

    const  email=validUser.email;


    const mailOptions = {
      from:  process.env.EMAIL,
      to: email,
      subject: 'Forgot password',
      text: `Your OTP is ${otp}`,
    };
  
    // Send email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error(error);
        res.status(500).send({ success: false, error: 'Failed to send OTP' });
      } else {
        // otpDocument.save();
        console.log('Email sent: ' + info.response);
        res.send({ success: true, otp: otp });
      }
    });
   
  } catch (error) {
    
    next(error);
  }

}



export const setforgotpassword = async (req, res, next) =>{

  
  try {
  const {confnewPass}=req.body;
  const {username}=req.params;

  
  const hashedPassword = bcryptjs.hashSync(confnewPass, 10);
  const updatedUser = await User.findOneAndUpdate(
    { username },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.status(200).json({ success:true,message: 'Password updated successfully.' });


} catch (error) {
   console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
}

}