import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    phone : {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String,
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    updateAt : {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User',UserSchema)
export default User
