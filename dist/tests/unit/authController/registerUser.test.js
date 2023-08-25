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
const authService_1 = __importDefault(require("../../../services/authService"));
const authController_1 = require("../../../controllers/authController");
// Mocks
jest.mock('../../../services/authService');
jest.mock('jsonwebtoken');
describe('registerUser function', () => {
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
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', role: 'maker', password: 'password' });
        const res = mockResponse();
        // Mock AuthService's registerUser to return a user object
        authService_1.default.prototype.registerUser.mockResolvedValue({ username: 'testuser', role: 'maker' });
        yield (0, authController_1.registerUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'success',
            data: { username: 'testuser', role: 'maker' }
        });
    }));
});
