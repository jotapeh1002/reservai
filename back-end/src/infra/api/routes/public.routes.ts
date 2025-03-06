import { Router } from "express";
import { LoginController } from "../controllers/user/Login";
import { LoginUser } from "../../../domain/usecase/LoginUser";
import { PasswordHasher } from "../../../core/service/PasswordHasher";
import { TokenProvider } from "../../../core/service/TokenProvider.";
import { UserRepository } from "../../database/repositories/User.repositories";
import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../../../domain/usecase/CreateUser";
import { CreateUserController } from "../controllers/user/CreateUser";
import { CreateRestaurant } from "../../../domain/usecase/CreateRestaurant";
import { RestaurantRepository } from "../../database/repositories/Restaurant.repositories";
import { CreateRestaurantController } from "../controllers/restaurant/CreateRestaurant";
import { GetAllRestaurant } from "../../../domain/usecase/GetAllRestaurant";
import { GetAllRestaurantController } from "../controllers/restaurant/getAllRestaurant";
import { AuthToken } from "../middleware/AuthToken";

export const publicRoutes = Router();

const passwordHasher = new PasswordHasher();
const tokenProvider = new TokenProvider();
const userRepository = new UserRepository(new PrismaClient());
const restaurantRepository = new RestaurantRepository(new PrismaClient());
const authToken = new AuthToken(tokenProvider).execute.bind(new AuthToken(tokenProvider));

const createUser = new CreateUser(userRepository,tokenProvider,passwordHasher);
const createUserController = new CreateUserController(createUser);

const loginUseCase = new LoginUser(passwordHasher,tokenProvider,userRepository);
const loginControllers = new LoginController(loginUseCase);

const createRestaurant = new CreateRestaurant(restaurantRepository,userRepository);
const createRestaurantControllers = new CreateRestaurantController(createRestaurant);

const findRestaurantById = new CreateRestaurant(restaurantRepository,userRepository);
const findRestaurantByIdControllers = new CreateRestaurantController(findRestaurantById);

const getallrestaurants = new GetAllRestaurant(restaurantRepository);
const getAllRestaurantControllers = new GetAllRestaurantController(getallrestaurants);

publicRoutes.post("/login", loginControllers.execute.bind(loginControllers));
publicRoutes.post("/register", createUserController.execute.bind(createUserController));
publicRoutes.post("/createrestaurant", createRestaurantControllers.execute.bind(createRestaurantControllers));
publicRoutes.get("/findrestaurantbyid", findRestaurantByIdControllers.execute.bind(findRestaurantByIdControllers));
publicRoutes.get("/getallrestaurants", authToken ,getAllRestaurantControllers.execute.bind(getAllRestaurantControllers));

