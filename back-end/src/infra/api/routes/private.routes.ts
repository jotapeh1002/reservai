import { Router } from "express";
import { TokenProvider } from "../../../core/service/index";
import { Auth } from "../controllers/index"
import { AuthTokenMiddleware } from "../middleware/index";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../database/repositories/index";

export const privateRoutes = Router();

const userRepository = new UserRepository(new PrismaClient());
const tokenProvider = new TokenProvider();
const authToken = new AuthTokenMiddleware(tokenProvider,userRepository);
const authController = new Auth();

privateRoutes.get('/auth',authToken.execute.bind(authToken),authController.execute)