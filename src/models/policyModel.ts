import { productModel } from "./src/models/productModel.ts";

export interface policyModel {
    id : string;
    productDtls : productModel;
    customerName : string;
    startDate : Date;
    endDate : Date;
    premium : number;
    status : string;
    createdAt : Date
}