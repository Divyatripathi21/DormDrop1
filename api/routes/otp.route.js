import express from 'express';
import { sendotp, setforgotpassword, verifyuser } from '../controllers/sendOTP.controller.js';
const router = express.Router();


router.post('/sendotp', sendotp);
router.post('/verifyuser', verifyuser);
router.post('/setforgotpassword/:username', setforgotpassword);


export default router;

