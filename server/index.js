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

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const PORT=8000;
app.listen(PORT,()=>{
    console.log("running on "+PORT)
})

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
