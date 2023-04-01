import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET  = dotenv.config().parsed.SECRET;

const verifyToken = (req, res, next) => {
    const token = req.token;
    if(!token) {
        return res.status(401).json({
            status: 'failure',
            message: 'No token provided!',
            data: ""
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.decoded = decoded;
        next();
    } catch(err) {
        console.log(err);
        if(err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            res.status(400).json({
                status: "failure",
                message: "Invalid token",
                data: ""
            })
            return    
        }
    }
}

export default verifyToken;