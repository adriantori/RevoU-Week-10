"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = require("./middlewares/mongoConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const openApiValidator = require("express-openapi-validator");
const authRoute_1 = require("./routes/authRoute");
const transferRoute_1 = __importDefault(require("./routes/transferRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
const openApiPath = './docs/swaggerDocumentation.yaml';
const file = fs_1.default.readFileSync(openApiPath, 'utf8');
const swaggerDocument = yaml_1.default.parse(file);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(openApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true
}));
const mongoUri = process.env.APP_MONGO_URI || "";
const dbName = process.env.APP_MONGO_DB || "";
mongoConnection_1.MongoConnection.connect(mongoUri, dbName)
    .then(() => {
    const addDbToRequest = (req, res, next) => {
        req.db = mongoConnection_1.MongoConnection.getDb();
        next();
    };
    app.use(addDbToRequest);
    app.use("/api/v1", authRoute_1.authRoute);
    app.use("/api/v1", transferRoute_1.default);
    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
})
    .catch(error => {
    console.error("Error connecting to the database:", error);
});
