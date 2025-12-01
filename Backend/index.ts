import express from "express";
import  {mainrouter} from "./routes/mainrouter.js";

const app=express();

app.use(express.json())
app.use("/api/v1",mainrouter)
app.listen(3000)