import { Router } from "express";
import { queryUserId } from "./controller/queryUserId";
import { queryUserIdent } from "./controller/queryUserIdent";
import { queryUserPassword } from "./controller/queryUserPassword";

export const userRouter = Router();

userRouter.post('/queryId', queryUserId);
userRouter.post('/queryIdent', queryUserIdent);
userRouter.post('/queryPassword', queryUserPassword);
