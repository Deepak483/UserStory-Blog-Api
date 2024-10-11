import express from "express";

const userRouter = express.Router();
import getAllUser from "../controllers/user-controller.js";
//get request
userRouter.get("/", getAllUser);
export default userRouter;
