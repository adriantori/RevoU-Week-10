import { Router } from "express";

import { registerUser, getAllUsers, loginUser } from "../controllers/authController";

export const authRoute = Router();

authRoute.post('/register', registerUser);

authRoute.post('/login', loginUser)

authRoute.get('/users', getAllUsers)
