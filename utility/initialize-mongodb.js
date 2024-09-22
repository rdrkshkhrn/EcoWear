import mongoose from "mongoose";

export async function initializeMongoDb(){
    try{
        const uri = process.env.MONGODB_URI;
        // const client = new MongoClient(uri);
        // await client.connect();
        const mongooseClient = await mongoose.connect(uri);
        console.log("mongo db intialized!");
        return mongooseClient.connection;
    }catch(e){
        console.log(`Error while intializing mongodb ${e}`);
    }
}