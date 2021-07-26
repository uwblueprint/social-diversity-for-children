export type StripeCheckoutRequest = {
    priceId: string;
    couponId?: string;
    quantity: number;
};
