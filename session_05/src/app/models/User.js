import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    refreshToken: {type: String},
    verify: {type: Boolean}
})

export default mongoose.model('User', User);