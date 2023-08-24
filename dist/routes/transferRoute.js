"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferController_1 = require("../controllers/transferController");
const authn_1 = __importDefault(require("../middlewares/authn"));
const transferRoute = (0, express_1.Router)();
transferRoute.post('/transfer', (0, authn_1.default)(["maker", "approver", "admin"]), transferController_1.createTransfer);
transferRoute.get('/transfer', (0, authn_1.default)(["maker", "approver", "admin"]), transferController_1.getAllTransfers);
transferRoute.patch('/transfer/:id', (0, authn_1.default)(["approver", "admin"]), transferController_1.patchTransfer);
transferRoute.delete('/transfer:id', (0, authn_1.default)(["admin"]), transferController_1.deleteTransfer);
exports.default = transferRoute;
