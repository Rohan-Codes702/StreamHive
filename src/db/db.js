import mongoose from "mongoose";
import { Db_Name } from "../constants.js"; 
const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${Db_Name}`);
        console.log("mongoDb connected")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB;