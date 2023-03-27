import mongoose from "mongoose"

const Schema = mongoose.Schema;

const Subject = new Schema({
  name: {type: String},
  description: {type: String}
});

export default mongoose.model('Subject', Subject);
