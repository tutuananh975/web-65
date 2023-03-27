import jwt from 'jsonwebtoken';

const createToken = (req, res, next) => {
    const user = req.responseUserData;
    req.token = jwt.sign({user}, '123456');
    next();
}

export default createToken;