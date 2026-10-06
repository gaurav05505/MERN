import express from 'express'
import {searchYt} from '../../backend/controller/ytSearch.controller.js'

const router = express.Router(); 

router.post("/ytsearch" , searchYt); 