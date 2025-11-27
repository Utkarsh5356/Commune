import  Router  from "express";

export const channel=Router()

channel.get("/",(req,res)=>{
    res.json("Hello channel")
})