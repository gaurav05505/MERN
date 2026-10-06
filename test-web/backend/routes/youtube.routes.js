import express from 'express';
import { searchYt } from '../controller/ytSearch.controller.js';

const router = express.Router();

router.post("/search/youtube", searchYt);
router.get("/search/youtube", searchYt);

export default router;