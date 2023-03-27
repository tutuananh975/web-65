import { objServerWrong } from '../../../app/models/serverWrong.js';
import UserModel from '../../../app/models/User.js';

const checkUserToLogin = (req, res, next) => {
    const username = req.body.username;
    UserModel.findOne({username})
        .then(user => {
            if(user === null) {
                res.status(500).json({
                    message: "Invalid username",
                    data: ""
                })
            } else {
                req.responseUserData = user;
                next();
            }
        })
        .catch(err => {
            res.status(400).json(objServerWrong)
        })
}

export default checkUserToLogin;