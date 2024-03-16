import express from 'express';
import { db } from '../db/db';
import { posts, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import exp from 'constants';
import { json } from 'body-parser';

export const createPost=async(req:express.Request,res:express.Response)=>{
    try {
        const username=req.user
        const {description}=req.body
    
        if(!description){
            res.sendStatus(401)
        }
        const userid=await db.select().from(users).where(eq(users.userName,username as string))
        if(userid.length>0){
            const usersID=userid[0].userId
            const create=await db.insert(posts).values({description:description as string,authorId:usersID as string})
        
            if(create){
                res.status(200).send("the post has created")
            }
        }else{
            res.send("cant craete any post")
        }
        
    } catch (error) {
        console.log("the error is  :",error)
        res.status(401).send("cant create an posts")   
    }
}


export const showPosts=async(req:express.Request,res:express.Response)=>{
    try {
        const show=await db.select().from(posts)
        if(show.length>0){
            res.status(200).send({show})
        }else{
            res.status(401).send("no posts to found")
        }
    } catch (error) {
        console.log("Error is error:",error)
        res.status(401).send(error)
    }
}

export const updatePost=async(req:express.Request,res:express.Response)=>{
    try {
        const username=req.user
        const {description}=req.body
        const usersID=await db.select().from(users).where(eq(users.userName,username as string))
        if(usersID.length>0){
            const userID=usersID[0].userId
            const update=await db.update(posts).set({
                description:description
            }).where(eq(posts.authorId,userID))
            if(update.length>0){
                res.status(200).send("user updated successfully")
            }
        }else{
            res.status(401).send("cant found a user")
        }
    } catch (error) {
        console.log("error happend in updating posts:",error)
        res.status(401).send("error happend in updating posts")   
    }
}

export const deletePost=async(req:express.Request,res:express.Response)=>{
    try {
        const username=req.user
        const usersID=await db.select().from(users).where(eq(users.userName,username as string))
        if(usersID.length>0){
            const userID=usersID[0].userId
            const deletes=await db.delete(posts).where(eq(posts.authorId,userID))
            if(deletes){
                res.status(200).send("post has deleted sucessfully")
            }
        }else{
            res.status(401).send("cant find a post for deletion")
        }
    } catch (error) {
        console.log("error is :",error)
        res.status(400).send("Error in user deletion")
    }
}

export const serchPosts=async(req:express.Request,res:express.Response)=>{
    try {
        
    } catch (error) {
        res.status(500).json({error:"there is no mathched item in that name"})
    }
}