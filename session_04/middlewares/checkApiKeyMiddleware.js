import UserModel from '../app/models/User.js';
import { objServerWrong } from '../app/models/serverWrong.js';

const checkApiKeyMiddleware = (req, res, next) => {
    const apiKey = req.query.apiKey;
    if(!apiKey) {
        res.status(500).json({
            message: "Please provide a apikey!",
            data: ""
        })
        return;
    }
    UserModel.findOne({apiKey})
        .then(user => {
            if (user !== null) {
                next();
            } else {
                res.status(500).json({
                    message: "Invalid apiKey",
                    data: ""
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(objServerWrong);
        })
}

export default checkApiKeyMiddleware;