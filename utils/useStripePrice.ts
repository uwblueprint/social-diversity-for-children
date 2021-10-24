import { Stripe } from "services/stripe";
import useSWR from "swr";
import fetcher from "./fetcher";

export type UseStripePriceResponse = {
    stripePrice: Stripe.Price;
    isLoading: boolean;
    error: any;
};

/**
 * use Stripe hook to get stripe price item
 * @param  {string} id
 * @returns UseStripeSessionResponse
 */
export default function useStripePrice(
    priceId: string,
): UseStripePriceResponse {
    const { data, error } = useSWR(`/api/price/${priceId}`, fetcher);
    return {
        stripePrice: data ? data.price : null,
        isLoading: !error && !data,
        error: error,
    };
}
