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
    const sanitizedRole = role.toLowerCase();
    try {
        const validateUsername = (username) => {
            return !!username && username.trim() !== '';
        };
        const validateRole = (role) => {
            const validRoles = ['maker', 'approver', 'admin'];
            return validRoles.includes(role);
        };
        const validatePassword = (password) => {
            const alphanumericPattern = /^[a-zA-Z0-9]{8,}$/;
            return alphanumericPattern.test(password);
        };
        if (!validateUsername(username)) {
            return res.status(400).json({
                message: 'User field cannot be blank'
            });
        }
        if (!validateRole(sanitizedRole)) {
            return res.status(400).json({
                message: 'Role is invalid. Must contain either "maker", "approver", or "admin"'
            });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Password is invalid. Must contain alphanumeric and minimum 8 characters'
            });
        }
        const authDao = new authDao_1.AuthDao(req.db);
        const authService = new authService_1.default(authDao);
        const user = yield authService.registerUser(username, sanitizedRole, password);
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
