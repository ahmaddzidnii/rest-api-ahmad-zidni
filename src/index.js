import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./routes/route.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

// Inisialisasi library dotenv untuk membaca file .env sebaga environment kita
dotenv.config();

// Deklarasikan port aplikasi API
const port = process.env.PORT || 2000;

// buat instance dari express js
const app = express();

// izinkan cors untuk domain yang berbeda
app.use(cors());

// Buat router endpoint REST API
app.use(router);

app.use(errorMiddleware);

// izinkan request berbentuk json
app.use(express.json());

// buat server di expess js
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
