import Router from "express"
import { db } from "../lib/prismaclient.js";

export const profile=Router()

interface DataType {
 id:string,
 name:string,
 imageUrl:string,
 email:string
}

profile.post("/create",async (req,res)=>{
try{
  const data:DataType=req.body;
  if(!data) return res.status(401).json({err:"you're not authorized"})
  const user=await db.profile.create({
     data:{
        userId:data.id,
        name:data.name,
        imageUrl:data.imageUrl,
        email:data.email
     }
   })
   if(!user) return res.status(403).json({err:"invalid inputs"})
   res.json({user})
}catch(err){
 return res.status(400).json({err})
} 
})

profile.put("/update",async(req,res)=>{
   const data:DataType=req.body
   if(!data) return res.status(401).json({err:"you're not authorized"})
   try{
    const user=await db.profile.update({
      where:{
       userId:data.id
      },
      data:{
       name:data.name,
       imageUrl:data.imageUrl,
       email:data.email
      }
    })
   if(!user) return  res.status(403).json({err:"invalid inputs"})
    res.json({user})
   }catch(err){
    return res.status(400).json({err})
   }
})

profile.get("/data",async (req,res)=>{
const userId=req.query.userId as string
if(!userId) return res.status(401).json({err:"you're not authorized"})
try{
  const user=await db.profile.findUnique({
   where:{
      userId:userId
   }
  })  
  if(!user) return res.status(403).json({err:"invalid input"})
  res.json({user})
}catch(err){
 return res.status(400).json({err})
}
})
