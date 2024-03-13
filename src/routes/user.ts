import express from 'express';
import { createUser, getAllUsers, loginUser, upadateUser } from '../controllers/user.controller';
import { cheakAuth } from '../middleware/auth.middleware';
import { refreshToken } from '../controllers/auth.controller';

const router=express.Router()

router.post('/create',createUser)

router.post('/login',loginUser)

router.get("/allusers",cheakAuth,getAllUsers)

router.post('/refesh',refreshToken)

router.put('/update',cheakAuth,upadateUser)

router.delete('/delete',)


export{router as userRoutes}