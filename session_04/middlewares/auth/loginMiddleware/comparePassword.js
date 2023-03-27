import bcrypt from 'bcrypt';
import { objServerWrong } from '../../../app/models/serverWrong.js';

const comparePassword = (req, res, next) => {
    const hash = req.responseUserData.password;
    const password = req.body.password;
    bcrypt.compare(password, hash)
        .then(result => {
            if(result) {
                next();
            } else {
                res.status(500).json({
                    message: "Invalid password",
                    data: ""
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(objServerWrong);
        })
}

export default comparePassword;