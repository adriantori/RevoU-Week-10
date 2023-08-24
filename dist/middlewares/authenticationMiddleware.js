"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../config/jwt"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
            error: 'unauthorized'
        });
    }
    else {
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, jwt_1.default);
            console.log(decodedToken, 'decodedToken');
            next();
        }
        catch (error) {
            res.status(400).json({
                message: 'error',
                error: error.message
            });
        }
    }
};
