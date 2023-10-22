import express from "express";
import { HandleGetPostalCode } from "../controller/handler.js";
import { HandleGetLocationByPostalCode } from "../controller/getLocationByPostalCode.js";
import { HandleGetAllPostalCodes } from "../controller/getAllPostalCodes.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua data kodepos
router.get("/postalcode/all", HandleGetAllPostalCodes);

router.get("/postalcode/:postalCode", HandleGetLocationByPostalCode);
router.get("/location", HandleGetPostalCode);

export default router;
