import { ResponseErorr } from "../errors/response-error.js";

const errorMiddleware = async (error, req, res, next) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseErorr) {
    return res
      .status(error.statusCode)
      .json({
        status: error.statusCode,
        error: error.message,
        data: null,
      })
      .end();
  } else {
    return res
      .status(500)
      .json({
        status: error.statusCode,
        erorr: error.message,
        data: null,
      })
      .end();
  }
};

export { errorMiddleware };
