import { prisma } from "../lib/prisma/db.js";

export const HandleGetLocationByPostalCode = async (req, res) => {
  try {
    const { postalCode } = req.params;

    //cek postalcode jika kosong return bad request
    if (!postalCode) {
      return res.status(400).json({
        mesasage: "postal code tidak boleh kosong!",
      });
    }

    // Mengubah tipe data dari string ke integer
    const postal_code = parseInt(postalCode);

    // Query database
    const [data] = await prisma.postalcodeall.findMany({
      where: {
        postal_code,
      },
    });

    // Handle tidak ada data di database
    if (!data) {
      return res.status(404).json({
        message: "Kode pos tidak ditemukan, pastikan mengisi dengan benar!",
      });
    }
    
    // Menampilkan response
    return res.json({
      message: "ok",
      data,
    });
  } catch (error) {
    // Handle server error
    return res.status(500).json({
      message: "Internal server error!",
    });
  }finally{
    //   Menutup koneksi ke database
    await prisma.$disconnect();

  }
};
