import express from "express";
import SubjectController from "../app/controllers/SubjectController.js";
const subjectRouter = express.Router();

subjectRouter.get("/", SubjectController.getAllSubjects)

export default subjectRouter;