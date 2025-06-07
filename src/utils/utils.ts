import * as fs from 'fs'
import { policy } from './models/policy.ts'

/*function formatPolicy(policy) {
    const obj = JSON.parse(policy)
    console.log(obj)
}*/

function getPolicies() {
    let policies : policy[] = fs.readFileSync('./utils/policies.json')
    return policies;
  }
  
  function getProducts() {
    let products = fs.readFileSync('./utils/products.json')
    return JSON.parse(products)
  }
  
  function getPolicy(identifier : string) {
    let policies = getPolicies()
    Array.prototype.myFind = function(obj) {
        return this.filter(function(item) {
            for (var id in obj)
                if (!(id in item) || obj[id] !== item[id])
                     return false;
            return true;
        });
    };
    //console.log(policies)
    //console.log(identifier)
    var policy = policies.myFind({id:identifier});
    console.log("policy in getPolicy method %%%%%%%  "+policy[0])
    let productId = policy[0].productId
    //console.log("productId >> "+policy[0].productId)
    let products = getProducts()
   //console.log(products)
    let productValues = products
        .filter(item => item.id == productId);
    console.log("product >> "+productValues)
    policy[0]["productDtls"] = productValues[0]
    console.log(policy)
    return policy;
  }



export {formatPolicy}