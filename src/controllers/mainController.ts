import express, { Router } from 'express';
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import * as fs from 'fs'
import { policyModel } from '../models/policyModel.ts';
import { policy } from '../models/policy.ts';
import { getPolicyDtls, isRequestAuthenticated, validatePolicy } from '../utils/utils.ts';
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
  console.log("In GET Endpoint!!!!!!");
  let identifier : string = req.params.id!;
  console.log("identifier >> "+identifier);
  let policy : policyModel = getPolicyDtls(identifier);
  res.status(200).json(policy);  
}

// API handler to fetch policy details for a particular customer 
export const getPoliciesForCustomer = (req : Request, res : Response) => {
  try {
    let customerName : string = req.query.customerName as string;
    console.log("customerName >> "+customerName);
    let policies : policy[] = getPolicies();
    console.log("initial length >> "+policies.length);
    let customerPolicies = policies
      .filter(item => item.customerName == customerName);
    console.log("customerPolicies length >> "+customerPolicies.length);
    console.log(customerPolicies);
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
  console.log('IN Create Policy');
  try {
    let policies : policy [] = getPolicies();
    console.log("Original Length of policy array >> "+policies.length)
    let newPolicy : policy = req.body; 
    console.log("req body "+JSON.stringify(req.body)); 
    let key = "x-auth";
    const keyVal : string = req.headers[key] as string;
    console.log("keyVal >> "+keyVal)
    if(! isRequestAuthenticated(keyVal)) {
      res.status(401).json({
        "message" : "Unauthorized Request"
      })
    } 
    else {   
      // Validation of policy
      const result : string = validatePolicy(newPolicy);
      console.log(result);
      if(result != 'All validations passed!') {
        res.status(400).json({"Error Message": result}); 
      }
      else {
        policies.push(newPolicy)
        console.log("Length of policy after addition >> "+policies.length)
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
  console.log("newPolicyDtls from Request Body >> "+JSON.stringify(newPolicyDtls, null, 4))  
  let key = "x-auth";
  const keyVal : string = req.headers[key] as string;
  if(! isRequestAuthenticated(keyVal)) {
    res.status(401).json({
      "message" : "Unauthorized Request"
    })
  } 
  else {
    let identifier : string = req.params.id as string;
    console.log("identifier >> "+ identifier);
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
      const newPolicy = {...filteredPolicy, ...newPolicyDtls};
      policies[index] = newPolicy;
      fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
        if(err)
          res.status(500).send("Error while saving to file")    
      })
      res.status(201).json(newPolicy)
    }
  }
}

// API to delete an existing policy by id
export const deletePolicy= (req : Request, res : Response) => {
  try {
    let policies : policy [] = getPolicies();
    console.log("Length of policies array before deletion >> "+policies.length)
    let identifier : string = req.params.id as string;
    console.log("identifier >> "+identifier)
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
      console.log("index >> "+index) 
      policies.splice(index, 1)
      console.log("Length of policies array after deletion >> "+policies.length)
      fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
        if(err)
          res.status(500).send("Error while writing to file")    
      })
      res.status(200).send("Policy deleted")
    }
  } catch(e) {
      res.status(500).json({"message" : 'Error occurred during processing'})
  }
}

