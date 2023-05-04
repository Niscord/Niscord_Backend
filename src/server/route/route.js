import { Router } from "express";
import { loginRouter } from "./login/loginRouter";

export const mainRouter = Router();

//* Router Endpoint

mainRouter.use('/login', loginRouter);