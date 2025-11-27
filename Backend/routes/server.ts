import Router from "express"

export const server=Router()

server.get("/",(req,res)=>{
    res.json("Hello server")
})