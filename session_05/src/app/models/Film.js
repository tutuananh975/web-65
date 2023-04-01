import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Film = new Schema({
    name: {type: String},
    isFree: {type: Boolean}
}) 

export default mongoose.model('Film', Film)