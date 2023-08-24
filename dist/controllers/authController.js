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
exports.loginUser = exports.getAllUsers = exports.registerUser = void 0;
const authDao_1 = require("../dao/authDao");
const authService_1 = __importDefault(require("../services/authService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../config/jwt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, role, password } = req.body;
    try {
        const authDao = new authDao_1.AuthDao(req.db);
        const authService = new authService_1.default(authDao);
        const user = yield authService.registerUser(username, role, password);
        res.status(200).json({
            message: 'success',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const authDao = new authDao_1.AuthDao(req.db);
    const authService = new authService_1.default(authDao);
    const user = yield authService.loginUser(username, password);
    console.log(jwt_1.default);
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username: user.username, id: user._id, role: user.role }, jwt_1.default);
        res.status(200).json({
            message: 'User successfully logged in',
            data: token
        });
    }
    else {
        res.status(400).json({
            error: 'password is incorrect'
        });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authDao = new authDao_1.AuthDao(req.db);
        const authService = new authService_1.default(authDao);
        const users = yield authService.getAllUsers();
        res.status(200).json({
            message: 'success',
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
});
exports.getAllUsers = getAllUsers;
