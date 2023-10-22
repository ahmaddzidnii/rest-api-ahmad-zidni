import { prisma } from "../lib/prisma/db.js";

export const HandleGetAllPostalCodes = async (req, res) => {
  const { page, limit } = req.query;
  const pageSize = parseInt(limit) || 100; // Jumlah data per halaman
  const currentPage = parseInt(page) || 1; // Halaman saat ini

  //   Handle dimana client mengirim limit dibawah 50
  if (pageSize < 50) {
    return res.status(400).json({
      message: "Limit tidak boleh kurang dari 50",
    });
  }

  try {
    // Menghitung jumlah total data
    const totalData = await prisma.postalcodeall.count();

    // Menghitung jumlah halaman
    const totalPages = Math.ceil(totalData / pageSize);

    //   Handle dimana saat client mengirim curent page lebih dari page size
    if (currentPage > totalPages) {
      return res.status(400).json({
        message: "Current page tidak boleh lebih dari page size!",
      });
    }

    // Menghitung indeks mulai dan selesai untuk data pada halaman saat ini
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalData);

    // Mengambil data dalam jumlah tertentu
    const data = await prisma.postalcodeall.findMany({
      skip: startIndex,
      take: pageSize,
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
          count: pageSize,
          total: totalData,
          per_page: pageSize,
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
