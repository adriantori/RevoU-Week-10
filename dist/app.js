"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = require("./middlewares/mongoConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = require("./routes/authRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use(express_1.default.json());
const mongoUri = process.env.APP_MONGO_URI || "";
const dbName = process.env.APP_MONGO_DB || "";
mongoConnection_1.MongoConnection.connect(mongoUri, dbName);
const addDbToRequest = (req, res, next) => {
    req.db = mongoConnection_1.MongoConnection.getDb();
    next();
};
app.use(addDbToRequest);
app.use("/api/v1", authRoute_1.authRoute);
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
