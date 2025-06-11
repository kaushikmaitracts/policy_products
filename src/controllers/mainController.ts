import express, { Router } from 'express';
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import * as fs from 'fs'
import { policyModel } from '../models/policyModel.ts';
import { policy } from '../models/policy.ts';
import { getPolicyDtls, isRequestAuthenticated, validatePolicy, policyFull } from '../utils/utils.ts';
import { getPolicies } from '../utils/utils.ts';
//import { }

const router = Router();
type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
  query : string; 
}

// API handler to fetch policy details including product for the given policy id
export const getPolicy = (req : Request, res : Response) => {
  let identifier : string = req.params.id!;
  let policy : policyFull = getPolicyDtls(identifier);
  res.status(200).json(policy);  
}

// API handler to fetch policy details for a particular customer 
export const  getPoliciesForCustomer = (req : Request, res : Response) => {
  try {
    let customerName : string = req.query.customerName as string;
    let policies : policy[] = getPolicies();
    let customerPolicies = policies
      .filter(item => item.customerName == customerName);
    if(customerPolicies.length >= 1)
      res.status(200).send(customerPolicies);
    else if(customerPolicies.length == 0)
      res.status(200).send('There are no policies for Customer Name '+customerName);
  } catch(e) {
      res.status(500).json({"message": 'Error occurred during processing'});
  }
}

// API to create a new policy
export const createPolicy = (req : Request, res : Response) => {
  try {
    let policies : policy [] = getPolicies();
    let newPolicy : policy = req.body; 
    let key = "x-auth";
    const keyVal : string = req.headers[key] as string;
    if(! isRequestAuthenticated(keyVal)) {
      res.status(401).json({
        "message" : "Unauthorized Request"
      })
    } 
    else {   
      // Validation of policy
      const result : string = validatePolicy(newPolicy);
      if(result != 'All validations passed!') {
        res.status(400).json({"Error Message": result}); 
      }
      else {
        policies.push(newPolicy);
        fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
          if(err)
            res.status(500).send("Error while saving to file")    
          else
            res.status(201).json(newPolicy)
        })
      }
    }
  } catch(e) {
      res.status(500).json({"message" : 'Error occurred during processing'});
  }
}
  
// API to update an existing policy by id
export const modifyPolicy = (req : Request, res : Response) => {
  let policies : policy [] = getPolicies();
  let newPolicyDtls : policy = req.body;
  let key = "x-auth";
  const keyVal : string = req.headers[key] as string;
  if(! isRequestAuthenticated(keyVal)) {
    res.status(401).json({
      "message" : "Unauthorized Request"
    })
  } 
  else {
    const result : string = validatePolicy(newPolicyDtls);
    if(result != 'All validations passed!') {
      res.status(400).json({"Error Message": result}); 
    }
    else {
      let identifier : string = req.params.id as string;
      let index : number = -1;
      let filteredPolicy : policy | undefined;
      filteredPolicy = policies.find(function(item : policy, i : number){
        if(item.id == identifier) {
          index = i;
          return i;
        }
      })
      if(index == -1) {
        res.status(400).send("Policy does not exist for given identifier")
      }
      else {
        const newPolicy : policy = {...filteredPolicy, ...newPolicyDtls};
        policies[index] = newPolicy;
        fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
          if(err)
            res.status(500).send("Error while saving to file");  
        })
        res.status(201).json(newPolicy);        
      }
    }
  }
}

// API to delete an existing policy by id
export const deletePolicy= (req : Request, res : Response) => {
  try {
    let policies : policy [] = getPolicies();
    let identifier : string = req.params.id as string;
    let key = "x-auth";
    const keyVal : string = req.headers[key] as string;
    if(! isRequestAuthenticated(keyVal)) {
      res.status(401).json({
        "message" : "Unauthorized Request"
      })
    } 
    else {
      // index to be found
      let index : number = -1;
      let filteredPolicy : policy | undefined;
      filteredPolicy = policies.find(function(item, i){
        if(item.id === identifier) {
          index = i;
          return i;
        }
      })
      if(index == -1)
        res.status(400).send("Policy does not exist for given identifier")
      else {
        policies.splice(index, 1)
        fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
          if(err)
            res.status(500).send("Error while writing to file")    
        })
        res.status(200).send("Policy deleted")
      }
    }
  } catch(e) {
      res.status(500).json({"message" : 'Error occurred during processing'})
  }
}

