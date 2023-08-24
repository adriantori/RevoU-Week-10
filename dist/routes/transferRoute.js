"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferRoute = void 0;
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
exports.transferRoute = (0, express_1.Router)();
exports.transferRoute.post('/transfer', transferController_1.createTransfer);
exports.transferRoute.get('/transfer', transferController_1.getAllTransfers);
