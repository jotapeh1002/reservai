import { Request, Response, Router } from "express";
import { LoginController,CreateRestaurantController, FindByUserIDController, GetAllRestaurantController,CreateUserController} from "../controllers/index";
import { LoginUser, CreateUser ,CreateRestaurant,GetAllRestaurant, FindRestaurantByUserID} from "../../../domain/usecase/index";
import { PasswordHasher, TokenProvider} from "../../../core/service/index";
import { UserRepository, RestaurantRepository } from "../../database/repositories/index";
import { PrismaClient } from "@prisma/client";

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
publicRoutes.get("/teste/api", (req:Request,res:Response) => { res.status(200).json({message: "Api rodando"}) });
publicRoutes.get("/findrestaurantbyuserid/:userid", findRestaurantByUserIdController.execute.bind(findRestaurantByUserIdController));
publicRoutes.get("/getallrestaurants", getAllRestaurantsController.execute.bind(getAllRestaurantsController));
