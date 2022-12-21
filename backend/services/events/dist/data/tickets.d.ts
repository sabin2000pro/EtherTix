export = tickets;
declare const tickets: {
    name: string;
    ticketClass: string;
    capacity: number;
    minimumQuantityPurchase: number;
    maximumQuantityPurchase: number;
    description: string;
    cost: number;
    ticketToken: string;
    isFree: boolean;
    deliveryMethods: string;
    onSaleStatus: string;
    confirmationMessage: string;
    ticketSold: boolean;
}[];
