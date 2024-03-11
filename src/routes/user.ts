import express from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/user.controller';
import { cheakAuth } from '../middleware/auth.middleware';
import { refreshToken } from '../controllers/auth.controller';

const router=express.Router()

router.post('/create',createUser)

router.post('/login',loginUser)

router.get("/allusers",cheakAuth,getAllUsers)

router.post('/refesh',refreshToken)

export{router as userRoutes}