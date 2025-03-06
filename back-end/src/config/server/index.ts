import { serverApp } from "../app";
import { config } from "dotenv";

config();

const _PORT = 3333;

serverApp.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
})