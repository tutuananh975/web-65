import { objServerWrong } from "../app/models/serverWrong.js";
import StatisticModel from "../app/models/Statistic.js";

const countMiddleware = (req, res, next) => {
    const user = req.query.apiKey.split('@')[0];
    const resource = req.path.split('/')[req.path.split('/').length - 1];
    console.log(resource);
    console.log(user)
    StatisticModel.updateOne({user}, { $inc: {[resource]: 1} })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    next();
}

export default countMiddleware;