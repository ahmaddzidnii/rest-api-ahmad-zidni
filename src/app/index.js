import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "../routes/route.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { logger } from "../../lib/winston/logging.js";
import { loggerMiddleware } from "../middleware/logger.js";

// Inisialisasi library dotenv untuk membaca file .env sebaga environment kita
dotenv.config();

// Deklarasikan port aplikasi API
const port = process.env.PORT || 2000;

// buat instance dari express js
const app = express();

// izinkan cors untuk domain yang berbeda
app.use(cors());

// izinkan request berbentuk json
app.use(express.json());

app.use(loggerMiddleware);

// Buat router endpoint REST API
app.use(router);

app.use(errorMiddleware);

// buat server di expess js
app.listen(port, () => {
  logger.info(`Server running in port ${port}`);
});
