import express from 'express'; 
import { searchWeb } from '../controller/searchWeb.controller.js';

const router = express.Router();

router.post("/search", searchWeb);

export  default router; 