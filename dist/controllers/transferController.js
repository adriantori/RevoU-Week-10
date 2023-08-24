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
exports.getAllTransfers = exports.createTransfer = void 0;
const transferDao_1 = require("../dao/transferDao");
const transferService_1 = __importDefault(require("../services/transferService")); // Update the path as needed
const createTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency, sourceAccount, destinationAccount } = req.body;
    try {
        const transferDao = new transferDao_1.TransferDao(req.db);
        const transferService = new transferService_1.default(transferDao);
        const transfer = yield transferService.createTransfer(amount, currency, sourceAccount, destinationAccount);
        res.status(200).json({
            message: 'success',
            data: transfer
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
});
exports.createTransfer = createTransfer;
const getAllTransfers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transferDao = new transferDao_1.TransferDao(req.db);
        const transferService = new transferService_1.default(transferDao);
        const transfers = yield transferService.getAllTransfers();
        res.status(200).json({
            message: 'success',
            data: transfers
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        });
    }
});
exports.getAllTransfers = getAllTransfers;
