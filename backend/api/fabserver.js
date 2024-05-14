import dotenv from "dotenv";
dotenv.config();
import yaml from "yamljs";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mainRouter from "./src/routes/index.js";
import swaggerUi from "swagger-ui-express";
import { badroutes,errosingeneral } from "./src/middlewares/globaleerorshandling.js";
const app = express();
app.use(cors());                            
const swaggerDocument = yaml.load("./documentationfile1.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/",mainRouter)
app.use('*',badroutes)
app.use(errosingeneral)
app.use(bodyParser.json())
mongoose.connect(process.env.DB_CONNECTION_LIVE, {      
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the port    http://localhost:${process.env.PORT}`);
  
});
