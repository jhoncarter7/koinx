import express from 'express';
import { findDeviation, saveCoinData } from '../controller/coinData.controller.js';


const router = express.Router();

// this will return the latest data about the requested cryptocurrency
router.post('/stats/:id', saveCoinData)
// this will return the standard deviation of the price of the requested cryptocurrency for the last 100 records
router.post("/deviation/:id", findDeviation)


export default router;
