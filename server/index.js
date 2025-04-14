import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./db/connectToDb.js";
import ItemRouter from "./routes/itemRoute.js";
import cors from "cors";
import ItemDetailRouter from "./routes/itemDetailRoute.js";


const app = express();
dotenv.config();
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.get("/",(req,res)=>{
//     return res.send("Home route")
// });

app.use("/api",ItemRouter);

// item detail
app.use("/api/itemdetails",ItemDetailRouter);

app.listen(process.env.PORT,()=>{
    console.log(`App is running on port : ${process.env.PORT}`);
    connectToMongoDb()   
})