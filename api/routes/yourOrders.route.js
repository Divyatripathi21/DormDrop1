import express from 'express';
import {  getUserYourOrders, userYourOrders } from '../controllers/yourOrders.controller.js';
const router = express.Router();


router.post('/useryourorders', userYourOrders);
router.get('/useryourorders/:username', getUserYourOrders);
export default router;