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
Object.defineProperty(exports, "__esModule", { value: true });
class TransferService {
    constructor(transferDao) {
        this.transferDao = transferDao;
    }
    createTransfer(amount, currency, sourceAccount, destinationAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transferDao.createTransfer(amount, currency, sourceAccount, destinationAccount);
        });
    }
    getAllTransfers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transferDao.getAllTransfer();
        });
    }
    updateTransfer(transactionId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transferDao.updateTransfer(transactionId, status);
        });
    }
    deleteTransfer(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transferDao.deleteTransfer(transactionId);
        });
    }
    getHistory(startDate, endDate, statusArray) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transferDao.getHistory(startDate, endDate, statusArray);
        });
    }
}
exports.default = TransferService;
