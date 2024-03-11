import express from 'express';
import * as jose from 'jose';

export const cheakAuth=async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const authHeader=req.headers["authorization"]
    const jwtToken=authHeader && authHeader.split(" ")[1]

    if(!jwtToken){
        return res.sendStatus(401)
    }

    try {
        const {payload}=await jose.jwtVerify(jwtToken,new TextEncoder().encode(process.env.SECRET_TOKN))
        const names=payload.username as string
        req.user=names
        
    } catch (error) {
        res.status(401).send("jwt token validatoion error")
    }

    next()
}