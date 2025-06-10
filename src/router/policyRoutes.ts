import { Router } from "express";
import { getPolicy } from "../controllers/mainController";

const policyRouter = Router();

//router.post('', createPolicy);

policyRouter.get('/:id', getPolicy);

export default policyRouter;