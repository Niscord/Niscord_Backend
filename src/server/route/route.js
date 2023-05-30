import { Router } from "express";
import { loginRouter } from "./login/loginRouter";
import { roomRouter } from "./room/roomRouter";
import { chatRouter } from "./chat/chatRouter";

export const mainRouter = Router();

//* Router Endpoint

mainRouter.use('/login', loginRouter);
mainRouter.use('/room', roomRouter);
mainRouter.use('/chat', chatRouter);