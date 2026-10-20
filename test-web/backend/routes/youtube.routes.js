import express from 'express';
import { searchYt } from '../controller/ytSearch.controller.js';
import { searchAIPoweredYT } from '../controller/aiPoweredYoutube.controller.js';

const router = express.Router();

router.post("/search/youtube", searchYt);
router.get("/search/youtube", searchYt);
router.post('/search/ai-youtube', searchAIPoweredYT);
router.get('/search/ai-youtube', searchAIPoweredYT);

export default router;