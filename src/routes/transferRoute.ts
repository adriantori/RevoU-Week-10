import { Router } from "express";
import { createTransfer, deleteTransfer, getAllTransfers, patchTransfer } from "../controllers/transferController";
import auth from "../middlewares/auth";

const transferRoute = Router()

transferRoute.post('/transfer',auth(["maker", "approver","admin"]), createTransfer);

transferRoute.get('/transfer', auth(["maker", "approver","admin"]), getAllTransfers);

transferRoute.patch('/transfer/:id', auth(["approver","admin"]), patchTransfer);

transferRoute.delete('/transfer:id', auth(["admin"]), deleteTransfer);

export default transferRoute;