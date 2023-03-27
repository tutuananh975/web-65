import mongoose from "mongoose"

const Schema = mongoose.Schema;

const User = new Schema({
  user: { type: String, default: "" },
  username: { type: String, minLength: 8, maxLength: 16 },
  password: { type: String },
  apiKey: {type: String}
});

export default mongoose.model('User', User);
