import express from "express";
// import todoRouter from "./routes/todoRoutes.js";
import dbConnect from './config/db/index.js';
import morgan from 'morgan';
import authRouter from "./routes/auth.js";
import studentRouter from "./routes/studentRoutes.js";
import statisticRouter from "./routes/statisticRouter.js";
import subjectRouter from "./routes/subjectRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import checkApiKeyMiddleware from "./middlewares/checkApiKeyMiddleware.js";
import countMiddleware from "./middlewares/countMiddleware.js";

const PORT = 8000;
const app = express();
// app.use(morgan('combined'));
dbConnect();
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/system/statistic", statisticRouter)
// app.use("/api/v1/todos", todoRouter);
app.use(checkApiKeyMiddleware);
app.use(countMiddleware);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/subjects", subjectRouter);

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});