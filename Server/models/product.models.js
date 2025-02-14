import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    image_uri : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    ar_uri : {
        type: String,
    },
    description : {
        type: String,
    },
    category : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
        }
    ],
    createAt : {
        type: Date,
        default: Date.now
    },
    updateAt : {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product',ProductSchema)
export default Product
