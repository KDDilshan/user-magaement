import express from 'express';
import { db } from '../db/db';
import { comments, users } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { userRoutes } from '../routes/user';

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

export const getCommentsPost=async(req:express.Request,res:express.Response)=>{
    try {
        const commetsPosts=await db.query.comments.findFirst({
            columns:{
                comment:true,
            },
            with:{
                creator:{
                    columns:{
                        userName:true
                    }
                },
                posts:{
                    columns:{
                        description:true
                    }
                }
            }
        })
        res.status(200).send(commetsPosts)
    } catch (error) {
        console.log("geting commnts error:",error)
        res.status(500).send("Invalid creadentials")
    }
}

export const editComment=async(req:express.Request,res:express.Response)=>{
    try {
        const {updatedComment}=req.body
        const userName=req.user
        const postID=req.params.id

        if(!updatedComment){
            res.status(401).send("no comment found")
        }
        const usersdetails=await db.select().from(users).where(eq(users.userName,userName as string))   
        if(usersdetails.length>0){
            const userID=usersdetails[0].userId
            const update=await db
            .update(comments).set({
                comment:updatedComment,
            }).where(and(eq(comments.authorId,userID),eq(comments.postsId,postID)))


            if(update[0].affectedRows>0){
                res.status(200).send("comment updated sucessfully")
            }else{
                res.status(401).json({error:"error in postID or commnet "})
            }
        }else{
            res.status(401).send("log in to edit commet")
        }

    } catch (error:any) {
        console.log("error in updating comment :",error)
        res.status(500).json({ error: "Error updating comment", message:error.message})
    }
}

export const deleteComment=async(req:express.Request,res:express.Response)=>{
    try {
        const userName=req.user
        const postID=req.params.id

        const userDetails=await db.select().from(users).where(eq(users.userName,userName as string))
        if(userDetails.length>0){
            const userId=userDetails[0].userId
            const comment=await db.select().from(comments).where(eq(comments.postsId,postID))
            const usersID=comment[0].authorId
            
            if(userId==usersID){
                const deletes=await db.delete(comments).where(and(eq(comments.postsId,postID),eq(comments.authorId,userId)))
                if(deletes){
                    res.status(200).send("commnet has deleted sucessfully")
                }
            }else{
                res.status(401).json({error:"cant delete posts created by another user"})
            }
        }else{
            res.status(401).json({error:"log in to delete posts"})
        }

    } catch (error:any) {
        console.log("error in deleting comment:",error)
        res.status(500).json({error:"Error deleting comment"})
    }
}