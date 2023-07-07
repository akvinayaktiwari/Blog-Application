import express from "express"; //added type: module in .json file
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import Connection from './database/db.js';
import Router from './routes/route.js'

dotenv.config();

const app=express();


app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)




const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log("running on "+PORT)
})

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
