//* Niscord: Backend
import express from "express";
import { mainRouter } from "./route/route";//* Router Import
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mode = process.env.MODE;

app.use('/', mainRouter);

app.listen(port, () => {
  mode === 'DEV' 
    ? console.log(`🤖🤖🤖 DEV MODE: Current server is running on http://localhost:${port}  🤖🤖🤖\n`)
    : console.log("💫💫💫 PRODUCTION MODE: Server Launched!\n 💫💫💫");
});