import { useRouter } from "next/router";
import { CheckoutButton } from "@components/CheckoutButton";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import { Box, Text, Divider, Flex } from "@chakra-ui/react";
import { CheckoutEnrollmentCard } from "@components/CheckoutEnrollmentCard";
import CardInfoUtil from "@utils/cardInfoUtil";
import { locale } from "@prisma/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import useSWR from "swr";
import fetcherWithId from "@utils/fetcherWithId";
import { Loading } from "@components/Loading";
import colourTheme from "@styles/colours";

type CheckoutProps = {
    session: Record<string, unknown>;
};

export default function Checkout({ session }: CheckoutProps): JSX.Element {
    const router = useRouter();
    const { classId, couponId } = router.query;
    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId, classId, router.locale],
        fetcherWithId,
    );

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (isClassInfoLoading) {
        return <Loading />;
    } else if (classInfoError) {
        return <Box>An Error has occured</Box>;
    }

    const classCard = classInfoResponse
        ? CardInfoUtil.getClassCardInfo(
              classInfoResponse.data,
              router.locale as locale,
          )
        : null;

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
            {classInfoResponse && (
                <>
                    {/* divide by 100 since data is stored in cents */}
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Course Fee:</Text>
                        <Text>{`$${(
                            classInfoResponse.data.program.price / 100
                        ).toFixed(2)}`}</Text>
                    </Flex>
                    <Flex
                        mb="20px"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text>Coupon Applied (TODO):</Text>
                        <Text>{`-$${(
                            classInfoResponse.data.program.price / 100
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
                        <Text>{`$${(
                            classInfoResponse.data.program.price / 100
                        ).toFixed(2)}`}</Text>
                    </Flex>
                </>
            )}

            <CheckoutButton
                priceId={classInfoResponse.data.stripePriceId}
                quantity={1}
                couponId={couponId as string}
            />
        </Wrapper>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
