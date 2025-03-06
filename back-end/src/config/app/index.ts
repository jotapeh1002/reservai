import express from "express";
import cors from "cors"
import { publicRoutes } from "../../infra/api/routes/public.routes";

export const serverApp = express()

serverApp.use(express.json())

serverApp.use(express.urlencoded({ extended: true }));

serverApp.use(publicRoutes)

serverApp.use(cors({
    origin: "*",
}))