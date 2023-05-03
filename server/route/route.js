import { Router } from "express";

export const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send("GET - main basepoint in Backend Server.");
})