import { Router } from "express";
import { createPolicy, getPolicy, getPoliciesForCustomer, modifyPolicy, deletePolicy} from "../controllers/mainController";

const policyRouter = Router();

policyRouter.get('/:id', getPolicy);
policyRouter.get('/', getPoliciesForCustomer);
policyRouter.post('', createPolicy);
policyRouter.put('/:id', modifyPolicy);
policyRouter.delete('/:id', deletePolicy);

export default policyRouter;