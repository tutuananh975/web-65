import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import * as authController from '../app/controllers/authController.js';
import checkRole from '../middlewares/checkRole.js';
import verifyReFreshToken from '../middlewares/verifyReFreshToken.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/forgotPassword', authController.forgotPassword);
authRouter.post('/refreshToken', verifyReFreshToken, authController.refreshToken);

authRouter.use(verifyToken);
authRouter.post('/changePassword', authController.changePassword);
authRouter.use(checkRole);
authRouter.get('/users', authController.getAllUser);
authRouter.delete('/:email', authController.blockUser);

export default authRouter;