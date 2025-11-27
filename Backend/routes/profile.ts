import Router from "express"

export const profile=Router()

profile.get("/",(req,res)=>{
    res.json("create profile")
})
