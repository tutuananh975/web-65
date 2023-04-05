import e from "express";
import dbConnect from "./config/db/index.js";
import restaurentRouter from "./routes/restaurentRouter.js";
import catchErrorMiddleware from "./middlewares/catchErrorMiddleware.js";


const app = e();
dbConnect();

app.use('/restaurents', restaurentRouter);
app.use(catchErrorMiddleware);

app.listen(3002, () => {
    console.log('app listening on port 3002!!!')
})