import { Router } from "express";

import { createUser, getAllUsers } from "../controllers/authController";

export const authRoute = Router();

authRoute.post('/users', createUser);

authRoute.get('/users', getAllUsers)
