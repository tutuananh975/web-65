import express from 'express';
import StatisticController from '../app/controllers/StatisticController.js';

const statisticRouter = express.Router();
statisticRouter.get("/", StatisticController.show); 

export default statisticRouter;