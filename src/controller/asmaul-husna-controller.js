import { prisma } from "../../lib/prisma/db.js";
import { successResponse } from "../response/response-success.js";
import asmaulHusnaService from "../service/asmaul-husna-service.js";
const getAllAsmaulHusna = async (req, res, next) => {
  try {
    const data = await asmaulHusnaService.getAllAsmaulHusna(req);

    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

const getAllAsmaulHusnaById = async (req, res, next) => {
  try {
    const data = await asmaulHusnaService.getAllAsmaulHusnaById(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default {
  getAllAsmaulHusna,
  getAllAsmaulHusnaById,
};
