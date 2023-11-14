import { logger } from "../../lib/winston/logging.js";

const loggerMiddleware = (req, res, next) => {
  const { method, url } = req;

  logger.info(`terjadi request ke: ${url} dengan http method: ${method} `);
  next();
};

export { loggerMiddleware };
