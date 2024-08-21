import express, { Express } from "express";
import { pool } from "./db/connectToDB.js";

const port = 4000
const app = express()
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})

app.get('/',(req,res)=>{
    res.send(200)
})