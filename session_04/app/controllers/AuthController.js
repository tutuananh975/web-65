import { objServerWrong } from '../models/serverWrong.js';

class AuthController {
    resgister(req, res) {
        req.responseUserData.save()
            .then(() => {
                res.json({
                    message: "register successfully",
                    data: req.responseUserData,
                    token: req.token
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(objServerWrong)
            })
    }

    login(req, res) {
        res.status(200).json({
            message: "login successfully!!!",
            data: req.responseUserData,
            token: req.token
        })
    }
}

export default new AuthController();
