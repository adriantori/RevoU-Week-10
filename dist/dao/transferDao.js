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
exports.TransferDao = void 0;
class TransferDao {
    constructor(db) {
        this.db = db;
    }
    createTransfer(amount, currency, sourceAccount, destinationAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection('transfer').insertOne({ amount, currency, sourceAccount, destinationAccount, status: "pending" });
                return user;
            }
            catch (error) {
                throw new Error('Error creating transfer: ' + error.message);
            }
        });
    }
    getAllTransfer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection('transfer').find().toArray();
                return user;
            }
            catch (error) {
                throw new Error('Error getting any transfer:' + error.message);
            }
        });
    }
}
exports.TransferDao = TransferDao;
