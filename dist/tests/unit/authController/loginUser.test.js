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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = require("../../../controllers/authController");
// Mocks
jest.mock('../../../dao/authDao'); // You can mock AuthDao as needed
jest.mock('../../../services/authService');
jest.mock('jsonwebtoken');
describe('loginUser function', () => {
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
    it('should log in a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password' });
        const res = mockResponse();
        // Mock AuthService's loginUser to return a user object
        authService_1.default.prototype.loginUser.mockResolvedValue({ username: 'testuser', role: 'user' });
        // Mock jwt.sign to return a token
        jsonwebtoken_1.default.sign.mockReturnValue('mocked-token');
        // Mock the AuthDao instance
        const mockAuthDaoInstance = {
        // Define any necessary methods here if needed for testing purposes
        };
        yield (0, authController_1.loginUser)(req, res, mockAuthDaoInstance);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User successfully logged in',
            data: 'mocked-token'
        });
    }));
    it('should return an error when password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'incorrectpassword' });
        const res = mockResponse();
        // Mock AuthService's loginUser to return null, indicating incorrect password
        authService_1.default.prototype.loginUser.mockResolvedValue(null);
        // Mock the AuthDao instance
        const mockAuthDaoInstance = {
        // Define any necessary methods here if needed for testing purposes
        };
        yield (0, authController_1.loginUser)(req, res, mockAuthDaoInstance);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'password is incorrect'
        });
    }));
});
