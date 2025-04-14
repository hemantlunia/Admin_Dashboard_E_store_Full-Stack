import mongoose from "mongoose";

const connectToMongoDb = async(req,res)=>{
 try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB is connected to : ${conn?.connection?.host}`);
    
 } catch (error) {
    console.log("Error while connecting to database ",error);
    process.exit(1)
 }
}

export {connectToMongoDb}