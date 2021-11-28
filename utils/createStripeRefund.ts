/**
 * Create stripe refund response given payment intent
 * @param  {string} paymentIntentId
 * @returns Promise of refund response
 */
export async function createStripeRefund(paymentIntentId: string): Promise<Response> {
    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/api/refund/${paymentIntentId}`, request);
    return response;
}
