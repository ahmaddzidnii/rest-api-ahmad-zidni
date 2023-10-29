import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./routes/route.js";

// Inisialisasi library dotenv untuk membaca file .env sebaga environment kita
dotenv.config();

// Deklarasikan port aplikasi API
const port = process.env.PORT || 2000;

// buat instance dari express js
const app = express();

// izinkan cors untuk domain yang berbeda
app.use(cors());

// Mengatur direktori atau path untuk file HTML
// app.use(express.static("./view")); // Contoh: direktori file HTML ada di root direktori aplikasi

// Buat router endpoint REST API
app.use(router);

// izinkan request berbentuk json
app.use(express.json());

// buat server di expess js
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
