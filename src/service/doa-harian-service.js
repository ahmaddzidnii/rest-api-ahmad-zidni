import { prisma } from "../../lib/prisma/db.js";

const getAllDoaHarian = async (req) => {
  const doaHarian = await prisma.doa_sehari_hari.findMany();
  return doaHarian;
};

export default {
  getAllDoaHarian,
};
