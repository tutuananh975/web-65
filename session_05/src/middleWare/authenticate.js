import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../app/models/User.js';

const SECRET  = dotenv.config().parsed.SECRET;

const authenticate = async (req,res,next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        req.role = null;
        next();
    } else {
        try {
            const decoded = jwt.verify(token, SECRET);
            const email = decoded.email;
            const user = await UserModel.findOne({email});
            if(user) {
                req.role = user.role;
            } else {
                req.role = null;
            }
            next();
        } catch(err) {
            console.log(err);
            req.role = null;
            next();
        }
    }
}

export default authenticate;