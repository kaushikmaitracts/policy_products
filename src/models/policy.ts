interface policy {
    id : string;
    productId : string;
    customerName : string;
    startDate : Date;
    endDate : Date;
    premium : number;
    status : string;
    createdAt : Date
}

export { policy }