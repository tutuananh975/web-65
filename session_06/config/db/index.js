import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://tutuananh975:Tunglon1995@cluster0.fcukavx.mongodb.net/session_06';
const client = new MongoClient(url);
export const db = client.db('session_06');

const dbConnect = async () => {
    try {
        await client.connect();
        console.log('connect mongodb successfully!');
    } catch(err) {
        console.log(err);
        console.log('connect mongodb failed!');
    }
}

export default dbConnect;