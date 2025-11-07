import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const mongodb_url = process.env.MONGO_DB_URL;

export const connectDB = async() => {
    if(mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongodb_url!);
    }
    return mongodb_url;
        
}