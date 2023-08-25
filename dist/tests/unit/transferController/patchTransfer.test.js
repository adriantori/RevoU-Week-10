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
const mongodb_1 = require("mongodb"); // Assuming you're using MongoDB for ObjectId
const transferService_1 = __importDefault(require("../../../services/transferService"));
const transferDao_1 = require("../../../dao/transferDao");
const transferController_1 = require("../../../controllers/transferController");
const mongoConnection_1 = require("../../../middlewares/mongoConnection");
// Mocking Express request and response objects
const mockRequest = (overrides = {}) => (Object.assign({ params: { id: 'mockId' }, body: { status: 'approved' }, db: mongoConnection_1.MongoConnection.getDb }, overrides));
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe('patchTransfer', () => {
    it('should respond with success message and data on valid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDb = mongoConnection_1.MongoConnection.getDb(); // Mock your database connection
        // Mocking TransferDao and TransferService
        class MockTransferDao extends transferDao_1.TransferDao {
            findOne(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    return null; // Mocking the behavior of findOne
                });
            }
        }
        const mockTransferService = new transferService_1.default(new MockTransferDao(mockDb));
        const req = {
            params: { id: 'mockId' },
            body: { status: 'approved' },
            db: mockDb,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.spyOn(mongodb_1.ObjectId, 'isValid').mockReturnValue(true);
        yield (0, transferController_1.patchTransfer)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'success',
            data: expect.any(Object),
        });
    }));
    // ... other test cases ...
});
