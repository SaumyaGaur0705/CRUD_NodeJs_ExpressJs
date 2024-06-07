import express from "express";
import {Router} from "express";

import {getUsers, createUser,getUser,deleteUser,updateUser} from "../logic/users.js";
const router=Router();
// let users=[];
router.get("/users",getUsers);
router.post("/user",createUser);

router.get("/user/:id",getUser);
router.delete("/user/:id",deleteUser);
router.put("/user/:id",updateUser);
//router.patch("/user/:id",patchUser);
export default router;