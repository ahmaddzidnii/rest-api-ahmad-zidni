import express from "express";
import { HandleGetCities, HandleGetLocationByPostalCode, HandleGetPostalCode } from "../controller/handler.js";

const router = express.Router();

// Endpoint untuk mendapatkan data semua kota/kabupaten
router.get("/cities", HandleGetCities);
router.get("/postalcode", HandleGetPostalCode);
router.get("/location", HandleGetLocationByPostalCode);

export default router;
