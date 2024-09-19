import express from "express";
import { getRating, storeRating } from "../controllers/rating.controller.js";
const router = express.Router();

router.post("/storeRating", storeRating);
router.get('/storeRating/:username', getRating);

export default router;
