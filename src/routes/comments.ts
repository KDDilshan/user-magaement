import express from 'express';
import { commentCreate, getCommentsPost } from '../controllers/comment.controller';
import { cheakAuth } from '../middleware/auth.middleware';

const route=express.Router()

route.post('/create/:id',cheakAuth,commentCreate)

route.get('/allcomments',getCommentsPost)


export {route as commentRoute}