import { Stripe } from "services/stripe";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export type UseStripeSessionResponse = {
    stripeSession: Stripe.Checkout.Session;
    stripeSessionItems: Stripe.LineItem[];
    isLoading: boolean;
    error: any;
};

/**
 * use Stripe hook to get stripe session
 * @param  {string} id
 * @returns UseStripeSessionResponse
 */
export default function useStripeSession(
    sessionId: string,
): UseStripeSessionResponse {
    const { data, error } = useSWR(`/api/checkout/${sessionId}`, fetcher);
    return {
        stripeSession: data ? data.session : null,
        stripeSessionItems: data && data.items ? data.items.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
