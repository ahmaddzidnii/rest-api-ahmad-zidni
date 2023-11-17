import express from "express";

import postalcodeController from "../controller/postalcode-controller.js";
import asmaulHusnaController from "../controller/asmaul-husna-controller.js";
import doaHarianController from "../controller/doa-harian-controller.js";
import apiController from "../controller/api-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://docsapi.ahmadzidni.site");
});

// Endpoint untuk API kode pos
router.get("/postal-codes", postalcodeController.getAllPostallCodes);

router.get("/postal-code/:postalCode", postalcodeController.getLocationByPostalCode);

router.get("/postal-codes/search", postalcodeController.searchPostalCodeByLocation);

// Endpoint untuk API Asmaul Husna
router.get("/asmaul-husna", asmaulHusnaController.getAllAsmaulHusna);
router.get("/asmaul-husna/:id", asmaulHusnaController.getAllAsmaulHusnaById);

// Endpoint untuk API doa harian
router.get("/doa-harian", doaHarianController.getAllDoaHarian);
router.get("/doa-harian/:id", doaHarianController.getDoaHarianById);

router.use(apiController.routeNotFound);

export default router;
