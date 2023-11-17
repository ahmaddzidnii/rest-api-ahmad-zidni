import { prisma } from "../../lib/prisma/db.js";
import { ResponseErorr } from "../response/response-error.js";

const getAllAsmaulHusna = async (req) => {
  let { order, filter } = req.query;

  if (order !== "asc" && order !== "desc") {
    order = undefined;
  }
  let data = await prisma.asmaul_husna.findMany({
    orderBy: {
      id: order,
    },
  });

  if (filter !== "even" && filter !== "odd") {
    filter = undefined;
  }

  if (filter === "even") {
    data = data.filter((item) => item.id % 2 === 0);
  } else if (filter === "odd") {
    data = data.filter((item) => item.id % 2 === 1);
  }

  const responseData = {
    filter,
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

  const adjacentData = await prisma.asmaul_husna.findMany({
    where: {
      OR: [{ id: parseInt(id) - 1 }, { id: parseInt(id) + 1 }],
    },
    select: {
      id: true,
      text_latin: true,
    },
  });

  const beforeData = adjacentData.find((item) => item.id === parseInt(id) - 1);
  const afterData = adjacentData.find((item) => item.id === parseInt(id) + 1);

  const responseData = {
    pagination: {
      prev_asmaul_husna: !beforeData ? false : beforeData,
      next_asmaul_husna: !afterData ? false : afterData,
    },
    data,
  };

  return responseData;
};
export default {
  getAllAsmaulHusna,
  getAllAsmaulHusnaById,
};
