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
const authController_1 = require("../../../controllers/authController");
describe('loginUser', () => {
    it('should log in a user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a mock request object
        const req = {
            body: {
                username: 'testUser',
                password: 'testPassword',
            },
        };
        // Create a mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Call the loginUser function directly with the mock request and response objects
        yield (0, authController_1.loginUser)(req, res); // No authDao argument
        // Perform your assertions here based on the expected behavior of loginUser
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User successfully logged in',
            data: expect.any(String), // You can't directly match the token since it's dynamically generated
        });
    }));
});
