import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const checkauth = async (req, res, next) => {
    const token=req.header('token');
    
   if(!token){
    
    return res.send("Please LogIn/SignUp");
   }
   try{
    let user= JWT.verify(token,process.env.JWT_SECRET);
    req.user=user.email;
    next();
   }
   catch(error){
    return res.send("Token Invalid");
   }
}

export { checkauth };

