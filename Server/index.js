import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users.js";
import auth from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app=express();

const port=5000;
app.use(express.json());
app.use(cors());
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
app.use("/auth",auth);
app.use(usersRouter);

app.get("/",(req,res)=>res.send("Saumya"));

app.all("*",(req,res)=>res.send("Route doesn't exist"))
app.listen(port,()=>console.log(`Server is running on ${port}`));