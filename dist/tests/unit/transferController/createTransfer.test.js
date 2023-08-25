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
const transferController_1 = require("../../../controllers/transferController");
// Mocks
jest.mock('../../../services/transferService');
jest.mock('mongodb'); // Mock the ObjectId if needed
describe('createTransfer function', () => {
    const mockRequest = (body) => ({ body });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create a transfer', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({
            amount: 100,
            currency: 'USD',
            sourceAccount: 'source-account-id',
            destinationAccount: 'destination-account-id'
        });
        const res = mockResponse();
        // Mock TransferService's createTransfer to return a transfer object
        transferService_1.default.prototype.createTransfer.mockResolvedValue({
            // Define the properties of the transfer object here
            id: 'transfer-id',
            amount: 100,
            currency: 'USD',
            sourceAccount: 'source-account-id',
            destinationAccount: 'destination-account-id'
        });
        yield (0, transferController_1.createTransfer)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'success',
            data: {
                id: 'transfer-id',
                amount: 100,
                currency: 'USD',
                sourceAccount: 'source-account-id',
                destinationAccount: 'destination-account-id'
            }
        });
    }));
});
