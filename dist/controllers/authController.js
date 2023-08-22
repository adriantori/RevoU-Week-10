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
exports.createUser = void 0;
const authDao_1 = require("../dao/authDao");
const mongoConnection_1 = require("../middlewares/mongoConnection");
const authDao = new authDao_1.AuthDao(mongoConnection_1.MongoConnection.getDb());
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, role, password } = req.body;
    try {
        const user = yield authDao.createUser(username, role, password);
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
exports.createUser = createUser;
