import express from 'express';
import { createUser } from '../controllers/user.controller';

const router=express.Router()

router.post('/create',async(req,res)=>{
    const {userName,age,password,email,gender}=req.body
    try {
        await createUser(userName,age,password,email,gender)
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export{router as userRoutes}