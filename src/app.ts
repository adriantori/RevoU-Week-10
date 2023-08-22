import express, {NextFunction, Request, Response} from "express";
import { MongoConnection } from "./middlewares/mongoConnection";
import dotenv from "dotenv";
import { authRoute } from "./routes/authRoute";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

const mongoUri = process.env.APP_MONGO_URI || "";
const dbName = process.env.APP_MONGO_DB|| "";
MongoConnection.connect(mongoUri, dbName);

const addDbToRequest = (req: Request, res: Response, next: NextFunction) => {
    req.db = MongoConnection.getDb();
    next();
};

app.use(addDbToRequest);

app.use("/api/v1", authRoute);


app.listen(port, () => {
    console.log(`running on port ${port}`);
})