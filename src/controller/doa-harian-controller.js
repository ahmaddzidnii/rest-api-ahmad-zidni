import { successResponse } from "../response/response-success.js";
import doaHarianService from "../service/doa-harian-service.js";
const getAllDoaHarian = async (req, res, next) => {
  try {
    const data = await doaHarianService.getAllDoaHarian(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  }
};

const getDoaHarianById = async (req, res, next) => {
  try {
    const data = await doaHarianService.getDoaHarianById(req);
    return res.status(200).json(successResponse(200, "success", data));
  } catch (error) {
    next(error);
  }
};

export default {
  getAllDoaHarian,
  getDoaHarianById,
};
