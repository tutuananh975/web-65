import express from "express";
import TeacherController from "../app/controllers/TeacherController.js";
const teacherRouter = express.Router();

teacherRouter.get("/", TeacherController.getAllTeachers)

export default teacherRouter;