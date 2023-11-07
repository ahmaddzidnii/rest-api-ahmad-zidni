import { prisma } from "../lib/prisma/db.js";
import { sucsessResponse } from "../templates/succsesResponse.js";

export const HandleSearchPostalCodeByLocation = async (req, res) => {
  const { query, page, limit } = req.query;
  if (!query) {
    return res.status(404).json({
      message: "Data tidak ditemukan!",
    });
  }

  // Mengubah query params menjadi huruf kecil semua
  const queryLowerCase = query.toLowerCase();

  //   Mengubah string menjadi number
  const pageNumber = parseInt(page);
  const LimitNumber = parseInt(limit);

  // Validasi limit tidak boleh kurang dari 50
  if (LimitNumber < 50) {
    return res.status(400).json({
      message: "Limit tidak boleh kurang dari 50",
    });
  }

  const currentPage = page ? pageNumber : 1;
  const itemsPerPage = limit ? LimitNumber : 100;

  try {
    const totalItems = await prisma.postalcodeall.count({
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
      return res.status(404).json({
        message: "Data tidak ditemukan!",
        query,
        data: null,
      });
    }

    // Total halaman
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Menentukan data yang di skip pada query database di halaman tertentu
    const skip = (currentPage - 1) * itemsPerPage;

    // Menghitung jumlah item yang harus ditampilkan dalam halaman terakhir
    const itemsInLastPage = totalItems % itemsPerPage;
    const count = currentPage === totalPages ? itemsInLastPage : itemsPerPage;

    // Kondisi dimana tidak memiliki halaman selanjutnya
    const hasNextPage = totalPages === currentPage ? false : true;

    // Kondisi dimana tidak memiliki halaman sebelumnya
    const hasPrevPage = currentPage === 1 ? false : true;

    const data = await prisma.postalcodeall.findMany({
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

    return res.json(sucsessResponse(200, "success", responseData));
  } catch (error) {
    return res.status(500).json({
      message: "internal server error!",
    });
  } finally {
    await prisma.$disconnect();
  }
};
