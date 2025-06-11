import express from 'express';
import { Request, Response, NextFunction } from 'express';
import http from 'http';
import { getPolicies, getProducts, getPolicyDtls } from './utils/utils.ts';
import { policy } from './models/policy.ts';
import { productModel } from './models/productModel.ts';
import policyRouter from './router/policyRoutes.ts';
import { Router } from 'express';

export const app = express();

/*export let httpServer: ReturnType<typeof http.createServer>
const port = 3000
//var jsonParser = bodyParser.json()

export const Main = () => {
console.log('-----------------------');
app.use(express.urlencoded({extended : true}))
app.use(express.json());

console.log('-----------------------');
app.get('/main/healthcheck', () => {
console.log('In healthcheck endpoint ********************');
});

console.log('Starting Server');
httpServer = http.createServer(app);
httpServer.listen(3000, () => {
console.log('Server is listening on port 3000!');
});
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();*/

/*function getPolicy(identifier: string) {
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
console.log("policy in getPolicy method %%%%%%% "+policy[0])
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
}*/




//app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/policies', policyRouter);
app.listen(3000, () => {
    console.log('Server is up on port '+3000)
    //getPolicyDtls('pol_010');
    
})



function testFilter() {
/*let jsonArray =
[
{
id: 'pol_001',
productId: 'prod_motor',
customerName: 'Alice Smith',
startDate: '2025-01-01',
endDate: '2026-01-01',
premium: 320,
status: 'active',
createdAt: '2025-01-01T12:00:00Z'
},
{
id: 'pol_002',
productId: 'prod_pet',
customerName: 'Bob Johnson',
startDate: '2024-05-15',
endDate: '2025-05-15',
premium: 160,
status: 'active',
createdAt: '2024-05-15T08:00:00Z'
},
{
id: 'pol_003',
productId: 'prod_travel',
customerName: 'Carla Lewis',
startDate: '2024-06-01',
endDate: '2024-06-15',
premium: 85,
status: 'expired',
createdAt: '2024-05-20T14:30:00Z'
},
{
id: 'pol_004',
productId: 'prod_home',
customerName: 'Daniel Adams',
startDate: '2023-10-01',
endDate: '2024-10-01',
premium: 420,
status: 'cancelled',
createdAt: '2023-10-01T09:45:00Z'
},
{
id: 'pol_005',
productId: 'prod_motor',
customerName: 'Eva Martinez',
startDate: '2025-03-10',
endDate: '2026-03-10',
premium: 310,
status: 'active',
createdAt: '2025-03-10T16:00:00Z'
},
{
id: 'pol_006',
productId: 'prod_pet',
customerName: 'Fiona Green',
startDate: '2025-02-01',
endDate: '2026-02-01',
premium: 155,
status: 'active',
createdAt: '2025-02-01T11:00:00Z'
},
{
id: 'pol_007',
productId: 'prod_travel',
customerName: 'George Hall',
startDate: '2025-05-20',
endDate: '2025-06-10',
premium: 90,
status: 'active',
createdAt: '2025-05-10T13:00:00Z'
},
{
id: 'pol_008',
productId: 'prod_home',
customerName: 'Hannah Davis',
startDate: '2024-11-15',
endDate: '2025-11-15',
premium: 395,
status: 'active',
createdAt: '2024-11-15T08:30:00Z'
},
{
id: 'pol_009',
productId: 'prod_motor',
customerName: 'Ian Wright',
startDate: '2023-09-01',
endDate: '2024-09-01',
premium: 340,
status: 'expired',
createdAt: '2023-09-01T09:00:00Z'
},
{
id: 'pol_010',
productId: 'prod_travel',
customerName: 'Julia Black',
startDate: '2025-07-01',
endDate: '2025-07-20',
premium: 95,
status: 'active',
createdAt: '2025-06-15T10:00:00Z'
}
]
let filteredJsonArrayValues = jsonArray
.filter(item => item.id == 'pol_002');
console.log("filteredJsonArrayValues >> "+ filteredJsonArrayValues[0].id)*/

/*Array.prototype.myFind = function(obj) {
return this.filter(function(item) {
for (var id in obj)
if (!(id in item) || obj[id] !== item[id])
return false;
return true;
});
};
let x = 'pol_004'
var arrayFound = jsonArray.myFind({id:x});
console.log(arrayFound)*/
}

//export { app }
