import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@chakra-ui/react";

// stripePromise object which is resolved in the component
// for redirecting to checkout
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

type CheckoutButtonProps = {
    priceId: string;
    couponId?: string;
    quantity: number;
};

/**
 * CheckoutButton is a button component that redirects to the
 * stripe checkout page
 */
export const CheckoutButton: React.FC<CheckoutButtonProps> = (
    props: CheckoutButtonProps,
) => {
    const handleClick = async () => {
        const { sessionId } = await fetch("/api/checkout/session", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                priceId: props.priceId,
                couponId: props.couponId,
                quantity: props.quantity,
            }),
        }).then((res) => res.json());

        const stripe = await stripePromise;
        // TODO: Handle Error
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
    };
    return (
        <div>
            <Button colorScheme="blue" onClick={handleClick}>
                Checkout
            </Button>
        </div>
    );
};
