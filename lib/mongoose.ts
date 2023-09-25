import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set("strictQuery",true);

    if (!process.env.MONGO_URI) return console.log("MONGO_URI not found");
    if (isConnected) return console.log("Connected to DB")
    try {
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true
    } catch (error) {
        console.log(error)
    }
}