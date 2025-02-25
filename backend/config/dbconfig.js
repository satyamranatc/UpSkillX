import mongoose from "mongoose";
import "dotenv/config";
let MongoURI = process.env.MONGODB_URI;

export default  async function ConnectDB()
{
    try {
        await mongoose.connect(MongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
    
}

