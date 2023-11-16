import express from "express";

import postalcodeController from "../controller/postalcode-controller.js";
import asmaulHusnaController from "../controller/asmaul-husna-controller.js";
import apiController from "../controller/api-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://docsapi.ahmadzidni.site");
});

// Endpoint untuk API kode pos
router.get("/postalcodes", postalcodeController.getAllPostallCodes);

router.get("/postalcode/:postalCode", postalcodeController.getLocationByPostalCode);

router.get("/postalcodes/search", postalcodeController.searchPostalCodeByLocation);

// Endpoint untuk API Asmaul Husna
router.get("/asmaulhusna", asmaulHusnaController.getAllAsmaulHusna);
router.get("/asmaulhusna/:id", asmaulHusnaController.getAllAsmaulHusnaById);

router.use(apiController.routeNotFound);

export default router;
