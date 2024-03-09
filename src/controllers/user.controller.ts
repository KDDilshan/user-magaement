import { group } from "console";
import { db } from "../db/db"
import { users } from "../db/schema"

export const createUser=async(userName:string,age:number,password:string,email:string,gender:string)=>{
    try {
        if (gender !== 'male' && gender !== 'female') {
            throw new Error('Invalid gender value. Gender must be "male" or "female".');
        }else{
            const result=await db.insert(users).values({
                userName:userName,
                age:age,
                password:password,
                email:email,
                gender:gender,
                
            }).execute()
            console.log("user created successdully")
        }
    } catch (error) {
        console.log("Error in creating User")
    }
}