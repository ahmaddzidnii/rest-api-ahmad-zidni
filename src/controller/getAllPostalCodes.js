import { prisma } from "../lib/prisma/db.js";

export const HandleGetAllPostalCodes = async (req, res) => {
  const { page, limit } = req.query;

  const itemsPerPage = parseInt(limit) || 100; // Jumlah data per halaman
  const currentPage = parseInt(page) || 1; // Halaman saat ini

  //   Handle dimana client mengirim limit dibawah 50
  if (itemsPerPage < 50) {
    return res.status(400).json({
      message: "Limit tidak boleh kurang dari 50",
    });
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
      return res.status(400).json({
        message: "Page yang diminta melebihi page pada data pada database!",
      });
    }

    //   Handle dimana saat client mengirim curent page lebih dari page size
    if (currentPage > totalPages) {
      return res.status(400).json({
        message: "Current page tidak boleh lebih dari page size!",
      });
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

    return res.json({
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
    });
  } catch (error) {
    // Handle server error
    return res.status(500).json({
      message: "Internal server error!",
    });
  } finally {
    //   Menutup koneksi ke database
    await prisma.$disconnect();
  }
};
