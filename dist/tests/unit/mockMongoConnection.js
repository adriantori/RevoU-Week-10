"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMongoConnection = void 0;
class MockMongoConnection {
    static connect(uri, dbName) {
        // Mock the connection, you might need to adjust this based on your test requirements
        this.db = {};
    }
    static getDb() {
        return this.db;
    }
}
exports.MockMongoConnection = MockMongoConnection;
