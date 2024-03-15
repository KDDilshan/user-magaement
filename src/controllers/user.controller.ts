import { group } from "console";
import { db } from "../db/db"
import { users } from "../db/schema"
import express from 'express';
import { and, eq, is } from "drizzle-orm";
import * as jose from 'jose';
import { getToken } from "./auth.controller";
import { strict } from "assert";



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
            const accessToken=await getToken(payload,"1h")
            const refreshToken=await getToken(payload,"1d")
            res.cookie('refreshToken',refreshToken,{httpOnly:true,sameSite:'strict'})
            res.send(accessToken)
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
        if(allUsers.length>0){
            res.status(200).json(allUsers)
        }else{
            res.status(401).send("there is no user find")
        }
        
    } catch (error) {
        res.status(401).send("error in finding users")
    }
}

export const upadateUser=async(req:express.Request,res:express.Response)=>{
    try {
        const{email,age}=req.body
        const username=req.user
        const update=await db.update(users).set({
            email:email,
            age:age
        }).where(eq(users.userName,username as string))
        if(update){
            res.status(200).send(update)
        }
    } catch (error) {
        console.log("error hapend in updateing user:",error)
        res.status(401).send("error is happend in updating user")
    }
}

export const deleteUser=async(req:express.Request,res:express.Response)=>{
    try {
        const username=req.user
        console.log(username)
        const find=await db.select().from(users).where(eq(users.userName,username as string))
        if(find.length>0){
            const findid=find[0].userId
            const deletes=await db.delete(users).where(eq(users.userId,findid as string))
            if(deletes){
                res.status(200).send("user deleted sucessfully")
            }
        }else{
            res.send("user not found")
        }   
    } catch (error) {
        console.log("error is:",error)
        res.status(200).send("error in user deletion")
    }
}