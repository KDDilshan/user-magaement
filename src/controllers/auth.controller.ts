import * as jose from 'jose';
import express from 'express';
import cookieparser from 'cookie-parser';

export const getToken=async(payload:jose.JWTPayload,expiry?:string)=>{
    const signJWT=new jose.SignJWT(payload).setProtectedHeader({
        alg:"HS256"
    })

    if(expiry){
        signJWT.setExpirationTime(expiry)
    }

    return await signJWT.sign(
        new TextEncoder().encode(process.env.SECRET_TOKN)
    )
}

export const refreshToken=async(req:express.Request,res:express.Response)=>{
    const refreshToken=req.cookies['refreshToken']

    if (!refreshToken){
        return res.status(401).send("Access diended Refersh toekn is missing")
    }
    
    try {
        const {payload}=await jose.jwtVerify(refreshToken,new TextEncoder().encode(process.env.SECRET_TOKN))
        const accesstoken=await getToken(payload,"1h")
        res.send(accesstoken)
    } catch (error) {
        res.status(401).send("Errror with the refresh token")
    }
}
