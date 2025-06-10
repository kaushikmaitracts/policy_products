import * as fs from 'fs'
import { policy } from '../models/policy.ts'
import { productModel } from '../models/productModel.ts';
import { policyModel } from '../models/policyModel.ts';

  function getPolicies() : policy [] {
    const policies : policy [] = JSON.parse(fs.readFileSync('../src/utils/policies.json').toString());
    console.log('Policies *****************');
    //console.log(policies);
    return policies;
  }
  
  function getProducts() : productModel [] {
    let products : productModel [] = JSON.parse(fs.readFileSync('../src/utils/products.json').toString());
    console.log('Products *****************');
    //console.log(products);
    return products;
  }
  
  function getPolicyDtls(identifier : string) : policyModel {
    let policies : policy [] = getPolicies();
    let policy : policy | undefined;
    policy = policies.find ( function (obj : policy)  {
      return obj.id === identifier;
    });
    console.log(policy);
    let productId = policy?.productId;
    let products : productModel [] = getProducts();
    let product : productModel | undefined;
    product = products.find( function (obj : productModel) {
      return obj.id === productId;
    });
    console.log(product);
    let policyDtl : any;
    policyDtl = {...policy, productDtls : product};   
    return policyDtl;
  }



export { getPolicies, getProducts, getPolicyDtls}