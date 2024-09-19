import express from 'express';
import { senderForm } from '../controllers/sender.controller.js';
import { getSenderPost } from '../controllers/senderPost.controller.js';
const router = express.Router();


router.post('/senderform', senderForm);
router.get('/senderpost', getSenderPost);




export default router;