import express from "express";
import AuthController from "../app/controllers/AuthController.js";
import checkUserExist from "../middlewares/auth/registerMiddleware/checkUserExist.js";
import checkUserToLogin from "../middlewares/auth/loginMiddleware/checkUserToLogin.js";
import comparePassword from "../middlewares/auth/loginMiddleware/comparePassword.js";
import createToken from "../middlewares/auth/createToken.js";
// import { v4 as uuidv4 } from 'uuid';

const authRouter = express.Router();


authRouter.post('/register', checkUserExist, createToken, AuthController.resgister);

authRouter.post('/login', checkUserToLogin, comparePassword, createToken, AuthController.login)

export default authRouter;

