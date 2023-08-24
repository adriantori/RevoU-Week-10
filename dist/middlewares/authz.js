"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../config/jwt"));
const authz = (req, res, next) => {
    const authzHeader = req.headers.authorization;
    if (!authzHeader) {
        res.status(401).json({
            error: 'Unauthorized'
        });
    }
    else {
        const token = authzHeader.split(' ')[1];
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, jwt_1.default);
            if (decodedToken.role === 'admin') {
                next();
            }
            else {
                res.status(401).json({
                    error: 'Unauthorized'
                });
            }
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
        ;
    }
    ;
};
exports.default = authz;
