import express from 'express';
import mysql from 'mysql2/promise';
import {userRoutes} from './src/routes/user.ts';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { postRouter } from './src/routes/posts.ts';


const app=express()
const PORT=4000

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use("/user",userRoutes)
app.use("/posts",postRouter)

app.listen(PORT,()=>{
    console.log(`the app is listing tio port ${PORT}`)
})