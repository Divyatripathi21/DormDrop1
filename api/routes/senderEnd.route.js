import express from 'express';
import { senderEnd1 } from '../controllers/senderEnd1.controller.js';
import { receiverEnd1 } from '../controllers/senderEnd1.controller.js';
const router = express.Router();


router.post('/senderend1', senderEnd1);
router.get('/senderend1/:username', receiverEnd1);

export default router;