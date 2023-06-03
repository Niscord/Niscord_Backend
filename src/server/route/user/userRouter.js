import { Router } from "express";
import { queryUserId } from "./controller/queryUserId";

export const userRouter = Router();

userRouter.post('/queryId', queryUserId);