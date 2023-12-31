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
exports.AuthDao = void 0;
class AuthDao {
    constructor(db) {
        this.db = db;
    }
    registerUser(username, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection('users').insertOne({ username, role, password });
                return user;
            }
            catch (error) {
                throw new Error('Error creating user: ' + error.message);
            }
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection('users').find().toArray();
                return user;
            }
            catch (error) {
                throw new Error('Error getting any user:' + error.message);
            }
        });
    }
    loginUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.db.collection('users').findOne({ username });
                return user;
            }
            catch (error) {
                throw new Error('Error finding user: ' + error.message);
            }
        });
    }
}
exports.AuthDao = AuthDao;
