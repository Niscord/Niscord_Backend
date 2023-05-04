//* Niscord: Backend
import express from "express";
import { mainRouter } from "./route/route";//* Router Import
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import options from "../../swagger/swagger";
const dotenv = require("dotenv").config();

const app = express();
const specs = swaggerJSDoc(options); //* Swagger Options

const PORT = process.env.PORT;
const MODE = process.env.MODE;

//* Server Setting
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', mainRouter);

//* Swagger Docs Endpoint
app.use('/', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.listen(PORT, () => {
  MODE === 'DEV' 
    ? console.log(`🤖🤖🤖 DEV MODE: Current server is running on http://localhost:${PORT}  🤖🤖🤖`)
    : console.log("💫💫💫 PRODUCTION MODE: Server Launched! 💫💫💫");
});