import express from 'express';
import { createPost, deletePost, getUsersPosts, serchPosts, showPosts, updatePost } from '../controllers/post.controllers';
import { cheakAuth } from '../middleware/auth.middleware';

const route=express.Router()

route.post("/create",cheakAuth,createPost)

route.get('/allPosts',showPosts)

route.put('/update',cheakAuth,updatePost)

route.delete('/delete',cheakAuth,deletePost)

route.get('/serch',serchPosts)

route.get('/getUserPosts',getUsersPosts)

export {route as postRouter}

