import { Router } from "express";
import { AuthToken } from "../middleware/AuthToken";
import { TokenProvider } from "../../../core/service/TokenProvider";
import { Auth } from "../controllers/auth/Auth";

export const privateRoutes = Router();

const tokenProvider = new TokenProvider();
const authToken = new AuthToken(tokenProvider);
const authController = new Auth();

privateRoutes.get('/auth',authToken.execute.bind(authToken),authController.execute)