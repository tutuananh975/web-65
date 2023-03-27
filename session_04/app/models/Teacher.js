import mongoose from "mongoose"

const Schema = mongoose.Schema;

const Teacher = new Schema({
    name: {type: String},
    age: {type: Number},
});

export default mongoose.model('Teacher', Teacher);
