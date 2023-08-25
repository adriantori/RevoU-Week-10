import express, { NextFunction, Request, Response } from "express";
import { MongoConnection } from "./middlewares/mongoConnection";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import openApiValidator = require("express-openapi-validator");

import { authRoute } from "./routes/authRoute";
import transferRoute from "./routes/transferRoute";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

const openApiPath = './docs/swaggerDocumentation.yaml';
const file = fs.readFileSync(openApiPath, 'utf8');
const swaggerDocument = yaml.load(file);

console.log(swaggerDocument);

app.use(cors());
app.use(express.json());

const mongoUri = process.env.APP_MONGO_URI || "";
const dbName = process.env.APP_MONGO_DB || "";

console.log("app URI:", mongoUri);
console.log("app dbName:", dbName);

MongoConnection.connect(mongoUri, dbName)
  .then(() => {
    const addDbToRequest = (req: Request, res: Response, next: NextFunction) => {
      req.db = MongoConnection.getDb();
      next();
    };

    app.use(addDbToRequest);

    app.use("/api/v1", authRoute);
    app.use("/api/v1", transferRoute);

    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument!))

    app.use(openApiValidator.middleware({
      apiSpec: openApiPath,
      validateRequests: true
    }));

    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Errors connecting to the database:", error);
  });

export default app;