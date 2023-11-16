import { prisma } from "../../lib/prisma/db.js";
import { ResponseErorr } from "../response/response-error.js";

const getAllPostallCodes = async (req) => {
  const { page, limit } = req.query;

  const itemsPerPage = parseInt(limit) || 100; // Jumlah data per halaman
  const currentPage = parseInt(page) || 1; // Halaman saat ini

  //   Handle dimana client mengirim limit dibawah 50
  if (itemsPerPage < 50) {
    throw new ResponseErorr(400, "Limit tidak boleh kurang dari 50");
  }
  // Menghitung jumlah total data
  const totalItems = await prisma.postalcode.count();

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Menghitung jumlah item yang harus ditampilkan dalam halaman terakhir
  const itemsInLastPage = totalItems % itemsPerPage;
  const count = currentPage === totalPages ? itemsInLastPage : itemsPerPage;

  // Mengecek jika page yang dikirim client lebih dari yang ada di data base
  if (page > totalPages) {
    throw new ResponseErorr(400, "Page yang diminta melebihi page pada data pada database!");
  }

  // Menghitung indeks mulai dan selesai untuk data pada halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Mengambil data dalam jumlah tertentu
  const data = await prisma.postalcode.findMany({
    skip: startIndex,
    take: itemsPerPage,
  });

  // Kondisi dimana tidak memiliki halaman selanjutnya
  const hasNextPage = totalPages === currentPage ? false : true;

  // Kondisi dimana tidak memiliki halaman sebelumnya
  const hasPrevPage = currentPage === 1 ? false : true;
  const responseData = {
    pagination: {
      total_page: totalPages,
      has_prev_page: hasPrevPage,
      has_next_page: hasNextPage,
      current_page: currentPage,
      items: {
        count,
        total: totalItems,
        per_page: itemsPerPage,
      },
    },
    data,
  };
  return responseData;
};

const getLocationByPostalCode = async (req) => {
  const { postalCode } = req.params;
  if (!postalCode) {
    throw new ResponseErorr(400, "kode pos tidak boleh kosong!");
  }
  const postal_code = parseInt(postalCode);

  const [data] = await prisma.postalcode.findMany({
    where: {
      postal_code,
    },
  });

  if (!data) {
    throw new ResponseErorr(404, "lokasi tidak ditemukan");
  }

  const responseData = {
    postal_code_query: postalCode,
    data,
  };

  return responseData;
};

const searchPostalCodeByLocation = async (req) => {
  const { query, page, limit } = req.query;
  if (!query) {
    throw new ResponseErorr(400, "query tidak boleh kosong!");
  }

  // Mengubah query params menjadi huruf kecil semua
  const queryLowerCase = query.toLowerCase();

  //   Mengubah string menjadi number
  const pageNumber = parseInt(page);
  const LimitNumber = parseInt(limit);

  // Validasi limit tidak boleh kurang dari 50
  if (LimitNumber < 50) {
    throw new ResponseErorr(400, "Limit tidak boleh kurang dari 50!");
  }

  const currentPage = page ? pageNumber : 1;
  const itemsPerPage = limit ? LimitNumber : 100;

  const totalItems = await prisma.postalcode.count({
    where: {
      OR: [
        {
          city: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          district: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          subdistrict: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          province: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
      ],
    },
  });

  // Validasi jika tidak ada total items maka akan return 404 not found
  if (!totalItems) {
    throw new ResponseErorr(404, "data tidak ditemukan!");
  }

  // Total halaman
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Mengecek jika page yang dikirim client lebih dari yang ada di data base
  if (page > totalPages) {
    throw new ResponseErorr(400, "Page yang diminta melebihi page pada data pada database!");
  }

  // Menentukan data yang di skip pada query database di halaman tertentu
  const skip = (currentPage - 1) * itemsPerPage;

  // Menghitung jumlah item yang harus ditampilkan dalam halaman terakhir
  const itemsInLastPage = totalItems % itemsPerPage;
  const count = currentPage === totalPages ? itemsInLastPage : itemsPerPage;

  // Kondisi dimana tidak memiliki halaman selanjutnya
  const hasNextPage = totalPages === currentPage ? false : true;

  // Kondisi dimana tidak memiliki halaman sebelumnya
  const hasPrevPage = currentPage === 1 ? false : true;

  const data = await prisma.postalcode.findMany({
    skip: skip,
    take: itemsPerPage,
    where: {
      OR: [
        {
          city: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          district: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          subdistrict: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
        {
          province: {
            mode: "insensitive",
            contains: queryLowerCase,
          },
        },
      ],
    },
  });

  const responseData = {
    pagination: {
      total_page: totalPages,
      has_prev_page: hasPrevPage,
      has_next_page: hasNextPage,
      current_page: currentPage,
      items: {
        count,
        total: totalItems,
        per_page: itemsInLastPage,
      },
    },
    query_search: query,
    data,
  };

  return responseData;
};

export default {
  getAllPostallCodes,
  getLocationByPostalCode,
  searchPostalCodeByLocation,
};
