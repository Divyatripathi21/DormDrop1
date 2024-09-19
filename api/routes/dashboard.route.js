import express from 'express';
import {  getUserDashboard, userDashboard } from '../controllers/dashboard.controller.js';
const router = express.Router();


router.post('/userdashboard', userDashboard);
router.get('/userdashboard/:username', getUserDashboard);
export default router;