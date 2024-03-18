import express from 'express';
import { commentCreate } from '../controllers/comment.controller';
import { cheakAuth } from '../middleware/auth.middleware';

const route=express.Router()

route.post('/create/:id',cheakAuth,commentCreate)




export {route as commentRoute}