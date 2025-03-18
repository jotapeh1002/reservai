import express from "express";
import cors from "cors"
import { publicRoutes } from "../../infra/api/routes/public.routes";
import { privateRoutes } from "../../infra/api/routes/private.routes";

export const serverApp = express()

serverApp.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}))

serverApp.use(express.json())

serverApp.use(express.urlencoded({ extended: true }));

serverApp.use(publicRoutes)
serverApp.use(privateRoutes)
