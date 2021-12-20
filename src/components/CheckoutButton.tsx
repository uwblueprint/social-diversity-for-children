import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

// stripePromise object which is resolved in the component
// for redirecting to checkout
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

type CheckoutButtonProps = {
    priceId: string;
    couponId?: string;
    quantity: number;
    successPath?: string;
};

/**
 * CheckoutButton is a button component that redirects to the
 * stripe checkout page
 */
export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
    priceId,
    couponId,
    quantity,
    successPath,
}) => {
    const { t } = useTranslation("form");

    const handleClick = async () => {
        const { sessionId } = await fetch("/api/checkout/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                priceId,
                couponId,
                quantity,
                successPath,
            }),
        }).then((res) => res.json());

        const stripe = await stripePromise;
        // TODO: Handle Error
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
    };
    return (
        <Button
            backgroundColor="#0C53A0"
            borderColor="brand.400"
            width="200px"
            height="54px"
            fontSize="16px"
            fontWeight="400"
            color="white"
            border="1px"
            mt="20px"
            mb="50px"
            onClick={handleClick}
        >
            {t("enroll.proceed")}
        </Button>
    );
};
