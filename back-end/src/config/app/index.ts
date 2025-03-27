import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { privateRoutes, publicRoutes } from "../../infra/api/routes";
import { ErrorMiddleware } from "../../infra/api/middleware/index";

export const serverApp = express();

serverApp.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "User-Agent"],
    credentials: true,
  })
);

serverApp.use(express.urlencoded({ extended: true }));

serverApp.use(cookieParser());

serverApp.use(express.json());

serverApp.use(privateRoutes);
serverApp.use(publicRoutes);

serverApp.use(ErrorMiddleware);
