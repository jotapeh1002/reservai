import { Router } from "express";
import { TokenProvider } from "../../../core/service/index";
import { Auth } from "../controllers/index"
import { AuthTokenMiddleware } from "../middleware/index";

export const privateRoutes = Router();

const tokenProvider = new TokenProvider();
const authToken = new AuthTokenMiddleware(tokenProvider);
const authController = new Auth();

privateRoutes.get('/auth',authToken.execute.bind(authToken),authController.execute)