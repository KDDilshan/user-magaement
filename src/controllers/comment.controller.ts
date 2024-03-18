import express from 'express';
import { db } from '../db/db';
import { comments, users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const commentCreate=async(req:express.Request,res:express.Response)=>{
    try {

        const {newComment}=req.body
        const userName=req.user
        const postID=req.params.id

        if(!newComment){
            res.status(401).send("no commnet found")
        }
        const usersId=await db.select().from(users).where(eq(users.userName,userName as string))        
        if(usersId.length>0){
            const userID=usersId[0].userId
            
            const create=await db.insert(comments).values({
                comment:newComment as string,
                authorId:userID,
                postsId:postID
            })
            console.log()
            if(create){
                res.status(200).json("comment created sucessfully")
            }
        }else{
            res.status(401).send("log in to add commets")
        }

    } catch (error) {
        console.log("Eroor in creating commnet:",error)
        res.status(500).json({error:"Invalid credentials"})
    }
}