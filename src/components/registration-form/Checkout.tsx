import { CheckoutButton } from "@components/CheckoutButton";
import { Text, Divider, Flex } from "@chakra-ui/react";
import { FormClassCard } from "@components/FormClass";

import colourTheme from "@styles/colours";
import { ClassCardInfo } from "@models/Class";
import useStripePrice from "@utils/hooks/useStripePrice";
import useStripeCoupon from "@utils/hooks/useStripeCoupon";
import { Stripe } from "services/stripe";
import { useTranslation } from "react-i18next";

type CheckoutProps = {
    classInfo: ClassCardInfo;
    couponId?: string;
    successPath?: string;
};

const getDiscountUnit = (unit: number, coupon: Stripe.Coupon) => {
    if (coupon && coupon.amount_off) {
        const result = unit - coupon.amount_off;
        return result >= 0 ? result : 0;
    } else if (coupon && coupon.percent_off) {
        return unit * (coupon.percent_off / 100);
    }
};

export const Checkout = ({
    classInfo,
    couponId,
    successPath,
}: CheckoutProps): JSX.Element => {
    const { t } = useTranslation("form");
    const { stripePrice: price, isLoading: isPriceLoading } = useStripePrice(
        classInfo.stripePriceId,
    );
    const { stripeCoupon: coupon } = useStripeCoupon(couponId);

    return (
        <>
            <Text mb="30px" fontWeight="700" fontSize="36px" mt="39px">
                {t("enroll.pay")}
            </Text>
            {classInfo && <FormClassCard classInfo={classInfo}></FormClassCard>}

            <Text mt="40px" mb="10px" fontWeight="700" fontSize="22px">
                {t("enroll.redeemCoupon")}
            </Text>
            <Text mb="30px" fontWeight="100" fontSize="14px">
                {t("enroll.redeemInfo")}
            </Text>

            <Text mb="30px" fontWeight="700" fontSize="22px">
                {t("enroll.order")}
            </Text>
            {classInfo && (
                <>
                    {/* divide by 100 since data is stored in cents */}
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>{t("enroll.fee")}</Text>
                        <Text>{`$${(isPriceLoading ? 0 : price.unit_amount / 100).toFixed(
                            2,
                        )}`}</Text>
                    </Flex>
                    {couponId && coupon && price ? (
                        <Flex
                            mb="20px"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Text>{t("enroll.coupon", { coupon: couponId })}</Text>
                            <Text>{`-$${(
                                getDiscountUnit(price.unit_amount, coupon) / 100
                            ).toFixed(2)}`}</Text>
                        </Flex>
                    ) : null}
                    <Divider mb="20px" borderColor={colourTheme.colors.MildGray} />
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>{t("enroll.total")}</Text>
                        <Text>{`$${(isPriceLoading
                            ? 0
                            : (price.unit_amount -
                                  (coupon
                                      ? getDiscountUnit(price.unit_amount, coupon)
                                      : 0)) /
                              100
                        ).toFixed(2)}`}</Text>
                    </Flex>
                </>
            )}

            <CheckoutButton
                priceId={classInfo.stripePriceId}
                quantity={1}
                couponId={couponId as string}
                successPath={successPath}
            />
        </>
    );
};
