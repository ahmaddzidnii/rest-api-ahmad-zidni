import { prisma } from "../../lib/prisma/db.js";
import { successResponse } from "../response/response-success.js";
import postalcodeService from "../service/postalcode-service.js";
const getAllPostallCodes = async (req, res, next) => {
  try {
    const data = await postalcodeService.getAllPostallCodes(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};
const getLocationByPostalCode = async (req, res, next) => {
  try {
    const data = await postalcodeService.getLocationByPostalCode(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

const searchPostalCodeByLocation = async (req, res, next) => {
  try {
    const data = await postalcodeService.searchPostalCodeByLocation(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default {
  getAllPostallCodes,
  getLocationByPostalCode,
  searchPostalCodeByLocation,
};
