"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/register', authController_1.registerUser);
exports.authRoute.post('/login', authController_1.loginUser);
exports.authRoute.get('/users', authController_1.getAllUsers);
