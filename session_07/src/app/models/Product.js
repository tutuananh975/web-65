import mongoose from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema({
    productName: {type: String, required: true},
    description: {type: String, required: true},
    level: {type: String, default: 'cơ bản'},
    slug: {type: String, slug: 'productName'}
}, {timestamps: true})

export default mongoose.model('Product', Product);