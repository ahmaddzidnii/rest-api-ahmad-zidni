import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000,
  limit: 15,
  message: {
    status: 429,
    message: "Too many requests, please try again later",
  },
});
