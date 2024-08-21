import express, { Express } from "express";
import { pool } from "./db/connectToDB.js";

const port = 4000   
const app = express()

// middleware
app.use(express.json())

// routes

app.get('/',async(req,res)=>{
    try{
        const data = await pool.query(
            'SELECT * FROM inputs'
        )
        res.status(200).send({ inputs: data.rows })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/',async(req,res)=>{

    const { input }:{
        input:string
    } = req.body

    try{
        await pool.query(
            'INSERT INTO tests (input) VALUES ($1)',[input]
        )
        res.status(200).send({msg:"successfully added input"})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

})

app.get('/setup',async(req,res)=>{

    try{
        await pool.query(
            'CREATE TABLE tests( id SERIAL PRIMARY KEY, input VARCHAR(100) )'
        )
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

})

// listen
app.listen(port,()=>{console.log(`server is listening at port ${port}`)})
