import express from 'express';
import { receiverForm } from '../controllers/receiver.controller.js';
import { getReceiverPost } from '../controllers/receiverPost.controller.js';
const router = express.Router();


router.post('/receiverform', receiverForm);
router.get('/receiverpost', getReceiverPost);




export default router;