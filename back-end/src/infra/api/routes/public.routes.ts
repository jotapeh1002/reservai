import { Router } from "express";
import { LoginController } from "../controllers/user/Login";
import { LoginUser } from "../../../domain/usecase/LoginUser";
import { PasswordHasher } from "../../../core/service/PasswordHasher";
import { TokenProvider } from "../../../core/service/TokenProvider";
import { UserRepository } from "../../database/repositories/User.repositories";
import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../../../domain/usecase/CreateUser";
import { CreateUserController } from "../controllers/user/CreateUser";
import { CreateRestaurant } from "../../../domain/usecase/CreateRestaurant";
import { RestaurantRepository } from "../../database/repositories/Restaurant.repositories";
import { CreateRestaurantController } from "../controllers/restaurant/CreateRestaurant";
import { GetAllRestaurant } from "../../../domain/usecase/GetAllRestaurant";
import { GetAllRestaurantController } from "../controllers/restaurant/getAllRestaurant";
import { FindByUserIDController } from "../controllers/restaurant/FindByUserID";
import { FindRestaurantByUserID } from "../../../domain/usecase/FindRestaurantByUserID";

export const publicRoutes = Router();

const passwordHasher = new PasswordHasher();
const tokenProvider = new TokenProvider();
const userRepository = new UserRepository(new PrismaClient());
const restaurantRepository = new RestaurantRepository(new PrismaClient());

const createUser = new CreateUser(userRepository, tokenProvider, passwordHasher);
const createUserController = new CreateUserController(createUser);

const loginUseCase = new LoginUser(passwordHasher, tokenProvider, userRepository);
const loginController = new LoginController(loginUseCase);

const createRestaurant = new CreateRestaurant(restaurantRepository, userRepository);
const createRestaurantController = new CreateRestaurantController(createRestaurant); 

const findRestaurantByUserId = new FindRestaurantByUserID(restaurantRepository)
const findRestaurantByUserIdController = new FindByUserIDController(findRestaurantByUserId)

const getAllRestaurants = new GetAllRestaurant(restaurantRepository);
const getAllRestaurantsController = new GetAllRestaurantController(getAllRestaurants);

publicRoutes.post("/login", loginController.execute.bind(loginController));
publicRoutes.post("/register", createUserController.execute.bind(createUserController));
publicRoutes.post("/createrestaurant", createRestaurantController.execute.bind(createRestaurantController));
publicRoutes.get("/findrestaurantbyuserid/:userid", findRestaurantByUserIdController.execute.bind(findRestaurantByUserIdController));
publicRoutes.get("/getallrestaurants", getAllRestaurantsController.execute.bind(getAllRestaurantsController));
