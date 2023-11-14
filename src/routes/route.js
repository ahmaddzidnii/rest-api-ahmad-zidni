import express from "express";
import path from "path";

import { HandleGetLocationByPostalCode } from "../controller/getLocationByPostalCode.js";
import { HandleSearchPostalCodeByLocation } from "../controller/searchPostalCodeByLocation.js";

import postalcodeController from "../controller/postalcode-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://docsapi.ahmadzidni.site");
});

// Endpoint untuk mendapatkan semua data kodepos
router.get("/postalcodes", postalcodeController.getAllPostallCodes);

router.get("/postalcode/:postalCode", HandleGetLocationByPostalCode);

router.get("/postalcodes/search", HandleSearchPostalCodeByLocation);

export default router;
