import e from "express";
import valiedateUser from '../middleWare/auth/validateUser.js'
import AuthController from "../app/controllers/AuthController.js";
import verifyToken from "../middleWare/auth/verifyToken.js";
import getRefreshToken from "../middleWare/auth/getRefreshToken.js";

const authRouter = e.Router();

authRouter.post('/login',valiedateUser, AuthController.login);

authRouter.post('/register',valiedateUser, AuthController.register);

authRouter.post('/register/verify', AuthController.verify);

authRouter.post('/refreshToken', getRefreshToken, verifyToken, AuthController.refreshToken)

export default authRouter;