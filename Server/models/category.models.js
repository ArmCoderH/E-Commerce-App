import mongoose from "mongoose";
const CategorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    image_uri : {
        type: String,
        required: true,
    },
    products : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
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

const Category = mongoose.model('Category',CategorySchema)
export default Category
