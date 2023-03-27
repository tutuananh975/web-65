import { objServerWrong } from '../models/serverWrong.js';
import StatisticModel from '../models/Statistic.js';

class StatisticController {
    show(req, res) {
        StatisticModel.find({})
            .then(data => res.status(200).json({
                message: "get statistic of system successfully!!!",
                data
            }))
            .catch(err => {
                console.log(err);
                res.status(400).json(objServerWrong);
            }) 
    }
}

export default new StatisticController();