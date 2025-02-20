import express  from "express";
import cors from "cors"

export const serverApp = express()

serverApp.use(cors({
    origin: "*",
}))

serverApp.use(express.json())
