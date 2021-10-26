import { Stripe } from "services/stripe";
import useSWR from "swr";
import { fetcher } from "./fetcher";

export type UseStripeCouponResponse = {
    stripeCoupon: Stripe.Coupon;
    isLoading: boolean;
    error: any;
};

/**
 * use Stripe hook to get stripe price item
 * @param  {string} id
 * @returns UseStripeSessionResponse
 */
export default function useStripeCoupon(
    couponId: string,
): UseStripeCouponResponse {
    const { data, error } = useSWR(`/api/coupon/${couponId}`, fetcher);
    return {
        stripeCoupon: data ? data.coupon : null,
        isLoading: !error && !data,
        error: error,
    };
}
