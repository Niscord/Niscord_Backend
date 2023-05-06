import { Router } from "express";
import { loginRouter } from "./login/loginRouter";
import { roomRouter } from "./room/roomRouter";

export const mainRouter = Router();

//* Router Endpoint

mainRouter.use('/login', loginRouter);
mainRouter.use('/room', roomRouter);