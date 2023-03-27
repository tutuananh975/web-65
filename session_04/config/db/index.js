import mongoose from 'mongoose';

async function dbConnect() {
    try {
        await mongoose.connect('mongodb+srv://tutuananh975:Tunglon1995@cluster0.220ekts.mongodb.net/mindx_database');
        console.log('Connect successfully!');
    } catch(error) {
        console.log('Connect failed');
    }
}

export default dbConnect;
