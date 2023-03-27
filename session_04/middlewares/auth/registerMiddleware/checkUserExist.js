import { objServerWrong } from '../../../app/models/serverWrong.js';
import UserModel from '../../../app/models/User.js';
import hashPW from '../../../utils/hashPW.js'

const checkUserExist = (req, res, next) => {
    const username = req.body.username;
    UserModel.findOne({username})
        .then(user => {
            if(user === null) {
                const userData = req.body;
                const hashPassword = hashPW(userData.password);
                const user = new UserModel({
                    ...userData,
                    password: hashPassword
                })
                req.responseUserData = user;
                next();
            } else {
                res.status(500).json({
                    message: "username is exist",
                    data: ""
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(objServerWrong);
        })
    
    // if (isExist() !== null) {
    //     res.status(500).json({
    //         message: "username is Exist",
    //         data: ""
    //     })
    //     return;
    // }
    // next();
}

export default checkUserExist;