import e from "express";
import * as restaurentController from "../app/controllers/restaurentController.js";

const restaurentRouter = e.Router();

restaurentRouter.get('/', restaurentController.getRestaurents);

restaurentRouter.get('/21', restaurentController.getRestaurents_21);

restaurentRouter.get('/22', restaurentController.getRestaurents_22);
restaurentRouter.get('/23', restaurentController.getRestaurents_23);
restaurentRouter.get('/24', restaurentController.getRestaurents_24);
restaurentRouter.get('/27', restaurentController.getRestaurents_27);
restaurentRouter.get('/28', restaurentController.getRestaurents_28);
restaurentRouter.get('/29', restaurentController.getRestaurents_29);
restaurentRouter.get('/30', restaurentController.getRestaurents_30);
restaurentRouter.get('/37', restaurentController.getRestaurents_37);
restaurentRouter.get('/38_42', restaurentController.getRestaurents_38_42);
restaurentRouter.get('/43_47', restaurentController.getRestaurents_43_47);
restaurentRouter.get('/48', restaurentController.getRestaurents_48);




// restaurentRouter.get('/filter', restaurentController.filterRestaurents);

// restaurentRouter.get('/filter/grades', restaurentController.filterByGrades);

export default restaurentRouter;