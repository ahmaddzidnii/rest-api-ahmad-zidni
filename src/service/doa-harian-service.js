import { prisma } from "../../lib/prisma/db.js";
import { ResponseErorr } from "../response/response-error.js";

const getAllDoaHarian = async (req) => {
  let { order_by, page, limit } = req.query;

  if (!page || isNaN(page)) {
    page = 1;
  }

  if (page) {
    page = parseInt(page);
  }

  if (!limit || isNaN(limit)) {
    limit = 10;
  }

  if (order_by !== "asc" && order_by !== "desc") {
    order_by = undefined;
  }

  const totalItems = await prisma.doa_sehari_hari.count();
  const totalPages = Math.ceil(totalItems / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const lastItemInLastPage = totalItems % limit;

  const count = page === totalPages ? lastItemInLastPage : limit;

  if (page > totalPages) {
    throw new ResponseErorr(400, "Page yang diminta melebihi page pada data pada database");
  }

  const doaHarian = await prisma.doa_sehari_hari.findMany({
    orderBy: {
      id: order_by,
    },
    take: limit,
    skip: (page - 1) * 10,
  });

  const responseData = {
    pagination: {
      total_page: totalPages,
      has_prev_page: hasPrevPage,
      has_next_page: hasNextPage,
      current_page: page,
      items: {
        count,
        total: totalItems,
        per_page: limit,
      },
    },
    order_by,
    data: doaHarian,
  };
  return responseData;
};

const getDoaHarianById = async (req) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new ResponseErorr("400", "id tidak ada atau tidak valid");
  }

  const doaHarian = await prisma.doa_sehari_hari.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!doaHarian) {
    throw new ResponseErorr("404", "doa tidak ditemukan");
  }
  return doaHarian;
};

export default {
  getAllDoaHarian,
  getDoaHarianById,
};
