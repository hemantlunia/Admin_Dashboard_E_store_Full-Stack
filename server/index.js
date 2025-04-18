import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./db/connectToDb.js";
import ItemRouter from "./routes/itemRoute.js";
import cors from "cors";
import ItemDetailRouter from "./routes/itemDetailRoute.js";

import path from "path"

const app = express();

dotenv.config();
const __dirname = path.resolve();
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

if (process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"../admin/dist")));


    app.get("/*splat",(req,res)=>{
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    })
}

app.listen(process.env.PORT,()=>{
    console.log(`App is running on port : ${process.env.PORT}`);
    connectToMongoDb()   
})