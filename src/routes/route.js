import express from "express";

import postalcodeController from "../controller/postalcode-controller.js";
import apiController from "../controller/api-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://docsapi.ahmadzidni.site");
});

// Endpoint untuk mendapatkan semua data kodepos
router.get("/postalcodes", postalcodeController.getAllPostallCodes);

router.get("/postalcode/:postalCode", postalcodeController.getLocationByPostalCode);

router.get("/postalcodes/search", postalcodeController.searchPostalCodeByLocation);

router.use(apiController.routeNotFound);

export default router;
