import { group } from "console";
import { db } from "../db/db"
import { users } from "../db/schema"
import express from 'express';
import { and, eq, is } from "drizzle-orm";
import * as jose from 'jose';
import { getToken } from "./auth.controller";


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

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Please enter email and password");
        }

        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length === 0) {
            return res.status(400).send("User with this email does not exist");
        }
        
        const payload: jose.JWTPayload = {
            username: existingUser[0].userName,
            email:existingUser[0].email,
            gender:existingUser[0].gender
        };

        const userPasswordHash = existingUser[0].password;

        if (userPasswordHash=== null) {
            return res.status(404).send("Password not found for this user");
        }

        const isMatch = await Bun.password.verify(password, userPasswordHash);

        if (isMatch) {
            const accessToken=await getToken(payload,"30m")
            const refreshToken=await getToken(payload,"30m")
            res.send({accessToken,refreshToken})
        } else {
            res.status(401).send("Invalid password");
        }

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const getAllUsers=async(req:express.Request,res:express.Response)=>{
    try {
        const allUsers=await db.select().from(users)
        res.json(allUsers)
    } catch (error) {
        res.status(401).send("error in finding users")
    }
    
}