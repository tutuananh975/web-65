import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import { objServerWrong } from '../models/objServerWrong.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET = dotenv.config().parsed.SECRET;
const SALTROUNDS = 10;

class AuthController {
    login(req, res) {
        const { email, password } = req.body;
        const checkUser = async () => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return res.status(400).json({
                        status: "failure",
                        message: "Email does not exist",
                        data: ""
                    })
                }
                // const matchUser = await bcrypt.compare(password, user.password);
                const matchUser = await new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
                if (!matchUser) {
                    return res.status(400).json({
                        status: "failure",
                        message: "wrong password",
                        data: ""
                    })
                }
                if(!user.verify) {
                    return res.status(400).json({
                        status: "failure",
                        message: "unverified account",
                        data: ""
                    })
                }
                const token = jwt.sign({ email }, SECRET, { expiresIn: '8h' });
                const refreshToken = jwt.sign({ email }, SECRET, { expiresIn: "7d" });
                user.refreshToken = refreshToken;

                await user.save();
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 1000
                })
                // res.cookie('refreshToken', 'abc');
                res.status(200).json({
                    status: "ok",
                    message: "login successfully!!!",
                    data: {
                        name: user.name,
                        email: user.email,
                        token
                    }
                })
            } catch (err) {
                console.log(err);
                res.status(500).json(objServerWrong);
            }
        }
        checkUser();
    }

    register(req, res) {
        const { name, email, password } = req.body;
        const handleRegister = async (email, password) => {
            try {
                const user = await UserModel.findOne({ email });
                if (user === null) {
                    const hashPassword = bcrypt.hashSync(password, SALTROUNDS);
                    const newUser = new UserModel({
                        email,
                        name,
                        password: hashPassword,
                        role: "member",
                        refreshToken: "",
                        verify: false
                    })
                    newUser.save();
                    const temporaryToken = jwt.sign({email}, SECRET, {expiresIn: "2m"})
                    res.status(201).json({
                        status: "ok",
                        message: "register successfully!!!",
                        data: {temporaryToken}
                    })
                } else {
                    res.status(400).json({
                        status: "failure",
                        message: "email already exists!!!",
                        data: ""
                    })
                }
            } catch (err) {
                console.log(err);
                res.status(500).json(objServerWrong);
            }
        }
        handleRegister(email, password);
    }

    async verify(req, res) {
        let temporaryToken;
        if(req.headers.authorization) {
            temporaryToken = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({
                status: "failure",
                message: "No token provided!",
                data: ""
            })
        }
        try {
            const decoded = jwt.verify(temporaryToken, SECRET);
            const email = decoded.email;
            const user = await UserModel.findOne({email});
            if (user) {
                user.verify = true;
                user.save();
                res.status(200).json({
                    status: "ok",
                    message: "verify successfully!!!",
                    data: {
                        name: user.name,
                        email: user.email
                    }
                })
            }
        } catch(err) {
            if(err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                return res.status(400).json({
                    status: "failure",
                    message: "Invalid token",
                    data: ""
                })    
            }
            res.status(500).json(objServerWrong);
        }
    }

    refreshToken(req, res) {
        const email = req.decoded.email;
        const refreshToken = req.cookies.refreshToken;
        const handleRefreshToken = async () => {
            try {
                const user = await UserModel.findOne({ email, refreshToken });
                if (user) {
                    const newRefreshToken = jwt.sign({ email }, SECRET, { expiresIn: '7d' });
                    user.refreshToken = newRefreshToken;
                    console.log(newRefreshToken);
                    await user.save();
                    res.clearCookie('refreshToken');
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        maxAge: 7 * 24 * 60 * 1000
                    });
                    res.status(200).json({
                        status: "ok",
                        message: "refresh token successfully"
                    })
                }
            } catch (err) {
                console.log(err);
                res.status(500).json(objServerWrong);
            }
        }
        handleRefreshToken();
    }
}

export default new AuthController();