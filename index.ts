import express from 'express';
import mysql from 'mysql2/promise';
import {userRoutes} from './src/routes/user.ts';
import bodyParser from 'body-parser';

const app=express()
const PORT=4000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use("/user",userRoutes)

app.listen(PORT,()=>{
    console.log(`the app is listing tio port ${PORT}`)
})