import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Statistic = new Schema({
    user: {type: String},
    students: {type: Number},
    teachers: {type: Number},
    subjects: {type: Number}
});

export default mongoose.model('Statistic', Statistic);
