import express from "express";
import StudentController from "../app/controllers/StudentController.js";
const studentRouter = express.Router();

studentRouter.get("/", StudentController.getAllStudents)

export default studentRouter;