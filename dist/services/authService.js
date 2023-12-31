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
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor(authDao) {
        this.authDao = authDao;
    }
    registerUser(username, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return yield this.authDao.registerUser(username, role, hashedPassword);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authDao.getAllUser();
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authDao.loginUser(username);
                if (user) {
                    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error("login error: " + error.message);
            }
        });
    }
}
exports.default = AuthService;
