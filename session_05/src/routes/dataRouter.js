import express from 'express';
import DataController from '../app/controllers/DataController.js';
import authenticateAdmin from '../middleWare/authenticateAdmin.js';

const dataRouter = express.Router();

dataRouter.get('/', DataController.show);

dataRouter.use(authenticateAdmin);

dataRouter.post('/', DataController.insert);

dataRouter.put('/:name', DataController.edit);

dataRouter.delete('/:name', DataController.delete);

export default dataRouter;