import jwt from 'jsonwebtoken'; 
const JWT_SECRET = 'asddfasgasdg'

const createToken = (req, res, next) => {
    const user = req.responseUserData;
    req.token = jwt.sign({user}, JWT_SECRET, {expiresIn: "1h"});
    next();
}

export default createToken;