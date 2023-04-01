import express from 'express';
import authRouter from './routes/authRouter.js';
import dbConnect from './config/database/index.js';
import cookieParser from 'cookie-parser';
import dataRouter from './routes/dataRouter.js';
import authenticate from './middleWare/authenticate.js';

const PORT = '3001';
const app = express();
dbConnect();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

app.use(authenticate);
app.use('/api/v1/data', dataRouter);

app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
})