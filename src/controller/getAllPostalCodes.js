import { prisma } from "../lib/prisma/db.js";
import { failedResponse } from "../templates/failedResponse.js";
import { sucsessResponse } from "../templates/succsesResponse.js";

export const HandleGetAllPostalCodes = async (req, res) => {
  const { page, limit } = req.query;

  const itemsPerPage = parseInt(limit) || 100; // Jumlah data per halaman
  const currentPage = parseInt(page) || 1; // Halaman saat ini

  //   Handle dimana client mengirim limit dibawah 50
  if (itemsPerPage < 50) {
    return res.status(400).json(failedResponse(400, "Limit tidak boleh kurang dari 50"));
  }

  try {
    // Menghitung jumlah total data
    const totalItems = await prisma.postalcodeall.count();

    // Menghitung jumlah halaman
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Menghitung jumlah item yang harus ditampilkan dalam halaman terakhir
    const itemsInLastPage = totalItems % itemsPerPage;
    const count = currentPage === totalPages ? itemsInLastPage : itemsPerPage;

    // Mengecek jika page yang dikirim client lebih dari yang ada di data base
    if (page > totalPages) {
      return res.status(400).json(failedResponse(400, "Page yang diminta melebihi page pada data pada database!"));
    }

    // Menghitung indeks mulai dan selesai untuk data pada halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Mengambil data dalam jumlah tertentu
    const data = await prisma.postalcodeall.findMany({
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

    return res.json(sucsessResponse(200, "Get all postal code success!", responseData));
  } catch (error) {
    // Handle server error
    return res.status(500).json(failedResponse(500, "Internal server error!"));
  } finally {
    //   Menutup koneksi ke database
    await prisma.$disconnect();
  }
};
