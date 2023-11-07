import express from "express";
import path from "path";

import { HandleGetLocationByPostalCode } from "../controller/getLocationByPostalCode.js";
import { HandleGetAllPostalCodes } from "../controller/getAllPostalCodes.js";
import { HandleSearchPostalCodeByLocation } from "../controller/searchPostalCodeByLocation.js";

const router = express.Router();

const __dirname = path.dirname("view");

router.get("/", (req, res) => {
  res.redirect("https://docsapi.ahmadzidni.site");
  // const filePath = path.join(__dirname, "view", "index.html");
  // res.sendFile(filePath);
});

// Endpoint untuk mendapatkan semua data kodepos
router.get("/postalcodes", HandleGetAllPostalCodes);

router.get("/postalcode/:postalCode", HandleGetLocationByPostalCode);

router.get("/postalcodes/search", HandleSearchPostalCodeByLocation);

export default router;
