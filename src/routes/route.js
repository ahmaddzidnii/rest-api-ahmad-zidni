import express from "express";
import { HandleGetLocationByPostalCode } from "../controller/getLocationByPostalCode.js";
import { HandleGetAllPostalCodes } from "../controller/getAllPostalCodes.js";
import { HandleSearchPostalCodeByLocation } from "../controller/searchPostalCodeByLocation.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua data kodepos
router.get("/postalcode/all", HandleGetAllPostalCodes);

router.get("/postalcode/:postalCode/location", HandleGetLocationByPostalCode);

router.get("/postalcode/search", HandleSearchPostalCodeByLocation);

export default router;
