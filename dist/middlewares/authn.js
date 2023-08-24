"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../config/jwt"));
const authn = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authnHeader = req.headers.authorization;
        try {
            if (!authnHeader) {
                res.status(401).json({
                    message: 'Unauthorized',
                    error: 'No authentication header provided'
                });
                return;
            }
            const token = authnHeader.split(' ')[1];
            const decodedToken = jsonwebtoken_1.default.verify(token, jwt_1.default);
            const userRole = decodedToken.role; // Replace 'role' with the actual field in your decoded token containing the user's role
            if (allowedRoles.includes(userRole)) {
                next(); // User is authenticated and has an allowed role, proceed to the next middleware or route handler.
            }
            else {
                res.status(403).json({
                    message: 'Forbidden',
                    error: 'User does not have the required role'
                });
            }
        }
        catch (error) {
            res.status(400).json({
                message: 'Bad Request',
                error: error.message
            });
        }
    });
};
exports.default = authn;
