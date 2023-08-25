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
exports.MongoConnection = void 0;
const mongodb_1 = require("mongodb");
class MongoConnection {
    static connect(uri, dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = new mongodb_1.MongoClient(uri);
            console.log("URI:", uri);
            yield this.client.connect();
            this.db = this.client.db(dbName);
            console.log("dbName:", dbName);
        });
    }
    static getDb() {
        if (!this.db) {
            throw new Error('Database connection not established.');
        }
        console.log("getDb");
        return this.db;
    }
}
exports.MongoConnection = MongoConnection;
