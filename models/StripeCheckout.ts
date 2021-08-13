/**
 * The object passed to the stripe session endpoint to redirect the
 * the user to the intended checkout page
 */
export type StripeCheckoutRequest = {
    priceId: string;
    couponId?: string;
    quantity: number;
};
