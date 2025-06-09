import * as fs from 'fs'
import { policy } from '../models/policy.ts'
import { productModel } from '../models/productModel.ts';

/*function formatPolicy(policy) {
    const obj = JSON.parse(policy)
    console.log(obj)
}*/

function getPolicies() {
    let policies: policy [];
    const policyData = fs.readFileSync('.utils/policies.json');
    policies = JSON.parse(JSON.stringify(policyData));
    //let policiesDtls : policy[] = fs.readFileSync('./utils/policies.json')
    return policies;
  }
  
  function getProducts() {
    let products: productModel [];
    const productData = fs.readFileSync('./utils/products.json')
    products = JSON.parse(JSON.stringify(productData));
    //let products = fs.readFileSync('./utils/products.json')
    return products;
  }
  
  function getPolicy(identifier : string) {
    /*let policies = getPolicies()
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
    return policy;*/
  }



export { getPolicies, getProducts}