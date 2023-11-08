import { prisma } from "../lib/prisma/db.js";
import { failedResponse } from "../templates/failedResponse.js";
import { sucsessResponse } from "../templates/succsesResponse.js";

export const HandleGetLocationByPostalCode = async (req, res) => {
  const { postalCode } = req.params;

  if (!postalCode) {
    return res.status(400).json(failedResponse(400, "kode pos tidak boleh kosong!"));
  }

  const postal_code = parseInt(postalCode);

  try {
    const [data] = await prisma.postalcodeall.findMany({
      where: {
        postal_code,
      },
    });

    if (!data) {
      res.status(404).json(failedResponse(404, "lokasi tidak ditemukan"));
    }

    const responseData = {
      postal_code_query: postalCode,
      data,
    };

    return res.json(sucsessResponse(200, "success", responseData));
  } catch (error) {
    return res.status(500).json(failedResponse(500, " Internal server error!"));
  }
};
