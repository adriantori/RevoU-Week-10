import { Router } from "express";

import { createTransfer, getAllTransfers } from "../controllers/transferController";

export const transferRoute = Router();

transferRoute.post('/transfer', createTransfer);

transferRoute.get('/transfer', getAllTransfers)
