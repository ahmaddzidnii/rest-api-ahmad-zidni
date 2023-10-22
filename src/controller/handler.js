import { prisma } from "../lib/prisma/db.js";



export const HandleGetPostalCode = async (req, res) => {
  const { postalCode } = req.query;

  //cek postalcode jika kosong return bad request
  if (!postalCode) {
    return res.status(400).json({
      mesasage: "postal code tidak boleh kosong!",
    });
  }
  const postal_code = parseInt(postalCode);
  const query = await prisma.postalcode.findMany({
    where: {
      postal_code,
    },
  });

  if (query.length == 0) {
    return res.status(404).json({
      mesasage: "postal code tidak tidak ditemukan!",
    });
  }

  const { city_id, dis_id, subdis_id, prov_id } = query[0];

  const [cities] = await prisma.cities.findMany({
    where: {
      city_id,
    },
  });

  let [districts] = await prisma.districts.findMany({
    where: {
      dis_id,
    },
  });

  if (!districts) {
    districts = null;
  }

  const [subdistricts] = await prisma.subdistricts.findMany({
    where: {
      subdis_id,
    },
  });
  const [provinces] = await prisma.provinces.findMany({
    where: {
      prov_id,
    },
  });
  await prisma.$disconnect();

  return res.json({
    message: "Succsesss",
    cities,
    districts,
    subdistricts,
    provinces,
    postal_code,
  });
};

