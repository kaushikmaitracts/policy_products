import * as fs from 'fs'
import { policy } from '../models/policy.ts'
import { productModel } from '../models/productModel.ts';

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
  
  function getPolicy(identifier : string) {
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
    let policyDtl : policy;
    // Fill up Policy object attributes from Policy and ProductModel
    //policyDtl
    /*Array.prototype.myFind = function(obj) {
        return this.filter(function(item) {
            for (var id in obj)
                if (!(id in item) || obj[id] !== item[id])
                     return false;
            return true;
        });
    };*/
    //console.log(policies)
    //console.log(identifier)
    /*var policy = policies.myFind({id:identifier});
    console.log("policy in getPolicy method %%%%%%%  "+policy[0])*/
    
    //console.log("productId >> "+policy[0].productId)
    
   //console.log(products)
    /*let productValues = products
        .filter(item => item.id == productId);
    console.log("product >> "+productValues)
    policy[0]["productDtls"] = productValues[0]*/
    //console.log(policy)
    return policy;
  }



export { getPolicies, getProducts, getPolicy}