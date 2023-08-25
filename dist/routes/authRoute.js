"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authDao_1 = require("../dao/authDao");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/register', authController_1.registerUser);
exports.authRoute.post('/login', (req, res) => (0, authController_1.loginUser)(req, res, new authDao_1.AuthDao(req.db))); // Pass AuthDao instance here
exports.authRoute.get('/users', authController_1.getAllUsers);
