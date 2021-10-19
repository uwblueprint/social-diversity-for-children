import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CheckoutButton } from "@components/CheckoutButton";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import { Button, Box, Text, Divider, Flex } from "@chakra-ui/react";
import { CheckoutEnrollmentCard } from "@components/CheckoutEnrollmentCard";
import CardInfoUtil from "@utils/cardInfoUtil";
import { locale } from "@prisma/client";
import { ClassCardInfo } from "@models/Class";
import { ProgramCardInfo } from "@models/Program";
// test price id corresponding to a product in stripe
const testPriceId = "price_1J1GuzL97YpjuvTOePyVbsRh";

// test quantity to specify number of products
const testQuantity = 1;

// uncomment to test automatic coupon discounts
// const testCouponId = "3R69NQNw";

/**
 * This is a test page to test the Checkout Button Component
 * TODO: delete this page once the checkout button is consumed in
 * a different component or page
 */

type CheckoutProps = {
    session: Record<string, unknown>;
};

export default function Checkout({ session }: CheckoutProps): JSX.Element {
    const router = useRouter();
    const { classId } = router.query;
    const [classData, setClassData] = useState();
    const [classCard, setClassCard] = useState<ClassCardInfo>();
    const [programData, setProgramData] = useState();
    const [programCard, setProgramCard] = useState<ProgramCardInfo>();
    useEffect(() => {
        const getClassResponse = async () => {
            await fetch(`/api/class/${classId}`).then(async (res) => {
                const { data } = await res.json();
                data.classTranslation = router.locale;
                data.teacherRegs = "";
                const classCardData = data
                    ? await CardInfoUtil.getClassCardInfo(
                          data,
                          router.locale as locale,
                      )
                    : null;
                setClassData(data);
                setClassCard(classCardData);
            });
        };
        getClassResponse();
    }, [classId]);

    useEffect(() => {
        if (classData) {
            const getProgramResponse = async () => {
                await fetch(`/api/program/${classData.programId}`).then(
                    async (res) => {
                        const { data } = await res.json();
                        const programCardData = data
                            ? await CardInfoUtil.getProgramCardInfo(
                                  data,
                                  router.locale as locale,
                              )
                            : null;
                        setProgramData(data);
                        setProgramCard(programCardData);
                    },
                );
            };
            getProgramResponse();
        }
    }, [classData]);

    return (
        <Wrapper session={session}>
            <Flex
                mb="30px"
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <BackButton />
                <CloseButton />
            </Flex>
            <Text mb="30px" fontWeight="700" fontSize="36px">
                Confirm and Pay
            </Text>
            {classCard && (
                <CheckoutEnrollmentCard
                    classInfo={classCard}
                ></CheckoutEnrollmentCard>
            )}

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
            {programCard && (
                <>
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Course Fee:</Text>
                        <Text>{`$${programCard.price.toFixed(2)}`}</Text>
                    </Flex>
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Coupon Applied (TODO):</Text>
                        <Text>{`-$${programCard.price.toFixed(2)}`}</Text>
                    </Flex>
                    <Divider mb="20px" />
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Estimated Total:</Text>
                        <Text>{`$${programCard.price.toFixed(2)}`}</Text>
                    </Flex>
                </>
            )}

            <CheckoutButton
                priceId={testPriceId}
                quantity={testQuantity}
                // couponId={testCouponId}
            />
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
