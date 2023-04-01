import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbConnect = async () => {
    const connectString = dotenv.config().parsed.CONNECT_STRING;
    try {
        await mongoose.connect(connectString);
        console.log('connect db successfully!!!');
    } catch {
        console.log('Connect failed');
    }
}

export default dbConnect;

