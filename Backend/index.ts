import express from "express";
import { mainrouter } from "./routes/mainrouter";

const app=express();
app.use("/api/v1",mainrouter)
app.listen(3000)