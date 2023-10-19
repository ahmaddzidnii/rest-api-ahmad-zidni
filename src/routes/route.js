import express from "express";
import { prisma } from "../lib/prisma/db.js";

const router = express.Router();

// Rute GET
router.get("/kodepos", async (req, res) => {
  const { kodepos } = req.query;
  const data = await prisma.kodeposid.findMany({
    where: {
      kode_pos: parseInt(kodepos),
    },
  });
  // const data = await prisma.kodeposid.findMany({
  //   take: 25,
  // });

  res.json({
    data,
  });
});
router.get("/home", (req, res) => {
  res.send("Ini adalah rute home");
});

export default router;
