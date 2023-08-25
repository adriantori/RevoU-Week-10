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
const transferService_1 = __importDefault(require("../../../services/transferService"));
const mongodb_1 = require("mongodb");
const transferController_1 = require("../../../controllers/transferController");
// Mocks
jest.mock('../../../services/transferService');
jest.mock('mongodb');
describe('patchTransfer function', () => {
    const mockRequest = (body, params) => ({
        body,
        params
    });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update a transfer status', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ status: 'approved' }, { id: 'transfer-id' });
        const res = mockResponse();
        // Mock ObjectId constructor
        mongodb_1.ObjectId.mockImplementation((id) => id);
        // Mock TransferService's updateTransfer to return an updated transfer object
        transferService_1.default.prototype.updateTransfer.mockResolvedValue({
            // Define the properties of the updated transfer object here
            id: 'transfer-id',
            status: 'approved'
        });
        yield (0, transferController_1.patchTransfer)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'success',
            data: {
                id: 'transfer-id',
                status: 'approved'
            }
        });
    }));
    it('should handle invalid status', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ status: 'invalid-status' }, { id: 'transfer-id' });
        const res = mockResponse();
        yield (0, transferController_1.patchTransfer)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'error',
            error: 'Invalid status. Status must be either "approved" or "rejected".'
        });
    }));
});
