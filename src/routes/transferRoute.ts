import { Router } from "express";

import { createTransfer, getAllTransfer } from "../controllers/transferController";

export const transferRoute = Router();

transferRoute.post('/transfer', createTransfer);

transferRoute.get('/transfer', getAllTransfer)
