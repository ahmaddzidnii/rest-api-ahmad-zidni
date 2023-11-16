import { prisma } from "../../lib/prisma/db.js";
import { ResponseErorr } from "../response/response-error.js";

const getAllAsmaulHusna = async (req) => {
  let { order } = req.query;

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  const data = await prisma.asmaul_husna.findMany({
    orderBy: {
      id: order === "asc" ? "asc" : "desc",
    },
  });
  const responseData = {
    order,
    data,
  };
  return responseData;
};

const getAllAsmaulHusnaById = async (req) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new ResponseErorr("400", "id tidak ada atau tidak valid!");
  }

  if (id > 99 || id < 1) {
    throw new ResponseErorr("404", "Asmaul husna tidak ditemukan!");
  }

  const data = await prisma.asmaul_husna.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const beforeAsmaulHusna = await prisma.asmaul_husna.findUnique({
    where: {
      id: parseInt(id) - 1,
    },
    select: {
      id: true,
      text_latin: true,
    },
  });

  const nextAsmaulHusna = await prisma.asmaul_husna.findUnique({
    where: {
      id: parseInt(id) + 1,
    },
    select: {
      id: true,
      text_latin: true,
    },
  });

  const responseData = {
    pagination: {
      prev_asmaul_husna: !beforeAsmaulHusna ? false : beforeAsmaulHusna,
      next_asmaul_husna: !nextAsmaulHusna ? false : nextAsmaulHusna,
    },
    data,
  };

  return responseData;
};
export default {
  getAllAsmaulHusna,
  getAllAsmaulHusnaById,
};
