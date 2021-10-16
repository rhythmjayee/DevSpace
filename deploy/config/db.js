const mongoose=require("mongoose");
const config =require("config");
const db=config.get("mongoURI");

const connectDB=async()=>{
    try{
        await mongoose.connect(db,{
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true
        });
        console.log("Database Connected")
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports=connectDB;
