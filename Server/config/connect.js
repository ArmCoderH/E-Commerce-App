import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


// Connect to MongoDB
const connectDB = () => {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default connectDB;