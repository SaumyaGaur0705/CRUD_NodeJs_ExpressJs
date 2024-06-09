import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users.js";
const app=express();

const port=5000;
app.use(express.json());
app.use(cors());
app.use(usersRouter);

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);

// app.post("/user",(req,res)=>{
//     const user=req.body;
//     users.push({id:(users.length+1),...user});
//     res.send("User Added");
// });

app.get("/",(req,res)=>res.send("Saumya"));

app.all("*",(req,res)=>res.send("Route doesn't exist"))
app.listen(port,()=>console.log(`Server is running on ${port}`));