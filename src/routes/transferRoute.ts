import { Router } from "express";
import { createTransfer, getAllTransfers, patchTransfer } from "../controllers/transferController";
import authn from "../middlewares/authn";

const transferRoute = Router()

transferRoute.post('/transfer',authn(["maker", "approver","admin"]), createTransfer);

transferRoute.get('/transfer', authn(["maker", "approver","admin"]), getAllTransfers);

transferRoute.patch('/transfer/:id', authn(["approver","admin"]), patchTransfer);

transferRoute.delete('/transfer:id', authn(["admin"]))
export default transferRoute;