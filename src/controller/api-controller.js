const routeNotFound = (_, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found, Jika terjadi bug boleh melapor di github repo kami : https://github.com/ahmaddzidnii/rest-api-ahmad-zidni",
  });
};

export default {
  routeNotFound,
};
