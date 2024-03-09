import { group } from "console";
import { db } from "../db/db"
import { users } from "../db/schema"
import express from 'express';
import { eq } from "drizzle-orm";


export const createUser=(async(req:express.Request,res:express.Response)=>{
    try {
        const {userName,age,password,email,gender} = req.body

        if(!userName || !age || !password || !email || !gender){
            return res.sendStatus(400)
        }

        if (gender !== 'male' && gender !== 'female') {
            throw new Error('Invalid gender value. Gender must be "male" or "female".');
        }

        const existingUser=await db.select().from(users).where(eq(users.email,email))
        
        if(existingUser.length>0){
            console.log(existingUser)
           return res.status(400).send("the email hs already ented")
        }

        const hashedPassword= await Bun.password.hash(password,{
            algorithm:"bcrypt",
            cost:5
        })
        
        const result=await db.insert(users).values({
            userName:userName,
            age:age,
            password:hashedPassword,
            email:email,
            gender:gender,
        }).execute()
        
        return res.status(200).json("created user sucessfully").end()

    } catch (error) {
        console.log("Error has happen in creating a user:",error)
        return res.sendStatus(400)
    }
})