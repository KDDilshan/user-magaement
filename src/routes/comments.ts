import express from 'express';
import { commentCreate, deleteComment, editComment, getCommentsPost } from '../controllers/comment.controller';
import { cheakAuth } from '../middleware/auth.middleware';


const route=express.Router()

route.post('/create/:id',cheakAuth,commentCreate)

route.get('/allcomments',getCommentsPost)

route.put('/update/:id',cheakAuth,editComment)

route.delete('/delete/:id',cheakAuth,deleteComment)

export {route as commentRoute}