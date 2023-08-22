import { Router } from "express";

import { createUser } from "../controllers/authController";

export const authRoute = Router();

authRoute.post('/users', createUser);


