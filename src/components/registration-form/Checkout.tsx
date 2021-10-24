import { CheckoutButton } from "@components/CheckoutButton";
import { Text, Divider, Flex } from "@chakra-ui/react";
import { FormClassCard } from "@components/FormClass";

import colourTheme from "@styles/colours";
import { ClassCardInfo } from "@models/Class";
import useStripePrice from "@utils/useStripePrice";

type CheckoutProps = {
    classInfo: ClassCardInfo;
    couponId?: string;
    successPath?: string;
};

export const Checkout = ({
    classInfo,
    couponId,
    successPath,
}: CheckoutProps): JSX.Element => {
    const { stripePrice: price, isLoading: isPriceLoading } = useStripePrice(
        classInfo.stripePriceId,
    );

    return (
        <>
            <Text mb="30px" fontWeight="700" fontSize="36px" mt="39px">
                Confirm and Pay
            </Text>
            {classInfo && <FormClassCard classInfo={classInfo}></FormClassCard>}

            <Text mt="40px" mb="10px" fontWeight="700" fontSize="22px">
                Redeem Coupon
            </Text>
            <Text mb="30px" fontWeight="100" fontSize="14px">
                To redeem a coupon, add the desired coupon code upon proceeding
                to checkout. <br /> There will be an option to add the coupon
                code before having to provide payment.
            </Text>

            <Text mb="30px" fontWeight="700" fontSize="22px">
                Order Summary
            </Text>
            {classInfo && (
                <>
                    {/* divide by 100 since data is stored in cents */}
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Course Fee:</Text>
                        <Text>{`$${(isPriceLoading
                            ? 0
                            : price.unit_amount / 100
                        ).toFixed(2)}`}</Text>
                    </Flex>
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Coupon Applied (TODO):</Text>
                        <Text>{`-$${(isPriceLoading
                            ? 0
                            : price.unit_amount / 100
                        ).toFixed(2)}`}</Text>
                    </Flex>
                    <Divider
                        mb="20px"
                        borderColor={colourTheme.colors.MildGray}
                    />
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Estimated Total:</Text>
                        <Text>{`$${(isPriceLoading
                            ? 0
                            : price.unit_amount / 100
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
