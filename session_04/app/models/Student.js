import mongoose from "mongoose"

const Schema = mongoose.Schema;

const Student = new Schema({
    name: {type: String},
    age: {type: Number},
    slug: {type: String}
});

export default mongoose.model('Student', Student);
