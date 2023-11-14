import { successResponse } from "../response/response-success.js";
import postalcodeService from "../service/postalcode-service.js";
const getAllPostallCodes = async (req, res, next) => {
  try {
    const data = await postalcodeService.getAllPostallCodes(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  }
};
const getLocationByPostalCode = async (req, res, next) => {
  try {
    const data = await postalcodeService.getLocationByPostalCode(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  }
};

export default {
  getAllPostallCodes,
  getLocationByPostalCode,
};
