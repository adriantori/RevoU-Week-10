import { Router } from "express";
import { registerUser, getAllUsers, loginUser } from "../controllers/authController";
import { AuthDao } from "../dao/authDao";

export const authRoute = Router();

authRoute.post('/register', registerUser);
authRoute.post('/login', (req, res) => loginUser(req, res, new AuthDao(req.db))); // Pass AuthDao instance here
authRoute.get('/users', getAllUsers);
