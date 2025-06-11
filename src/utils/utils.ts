import * as fs from 'fs'
import dotenv from 'dotenv';
import { policy } from '../models/policy.ts'
import { productModel } from '../models/productModel.ts';
import { policyModel } from '../models/policyModel.ts';

  let policies : policy [];
  let products : productModel [];
  dotenv.config();

  function getPolicies() : policy [] {
    //console.log(POLICIES_JSON_FILE);
    policies = JSON.parse(fs.readFileSync('../src/utils/policies.json').toString());
    return policies;
  }
  
  function getProducts() : productModel [] {
    products = JSON.parse(fs.readFileSync('../src/utils/products.json').toString());
    return products;
  }
  
  function getPolicyDtls(identifier : string) : policyModel {
    policies = getPolicies();
    let policy : policy | undefined;
    policy = policies.find ( function (obj : policy)  {
      return obj.id === identifier;
    });
    if(policy == undefined) {
      //return undefined
    }
    let productId = policy?.productId;
    products = getProducts();
    let product : productModel | undefined;
    product = findProduct(productId ?? "");
    let policyDtl : any;
    policyDtl = {...policy, productDtls : product};   
    return policyDtl;
  }

  function findProduct(productId : string) : productModel {
    let product : productModel | undefined;
    product = products.find( function (obj : productModel) {
      return obj.id === productId;
    });
    return product!;
  }

  function validatePolicy(reqPolicy : policy) : string {
    let result : string = 'All validations passed!';
    if (!reqPolicy.customerName || !reqPolicy.productId || !reqPolicy.premium) {
      result = 'Invalid request';
    }
    else if (reqPolicy.productId != '') {
      products = getProducts();
      let product : productModel = findProduct(reqPolicy.productId);
      if(product == undefined) {
        result = 'Product doesn\'t exist. Request Invalid!';
      }
    }
    return result;
  }

  function isRequestAuthenticated(requestKey : string) : boolean {
    const apiKey = process.env.API_KEY;
    const apiValue = process.env.API_VALUE;
    console.log("apiKey >> "+apiKey);
    console.log("apiValue >> "+apiValue);
    if(requestKey == apiValue) 
      return true;
    else 
      return false;
  }

  export { getPolicies, getProducts, getPolicyDtls, validatePolicy, isRequestAuthenticated }