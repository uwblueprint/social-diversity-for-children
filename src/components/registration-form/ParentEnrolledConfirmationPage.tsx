import React, { useEffect, useState } from "react";
import { Center, Box, Text, Button, VStack, useToast } from "@chakra-ui/react";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { createClassRegistration } from "@utils/createClassRegistration";
import { Student } from "@prisma/client";
import { Loading } from "@components/Loading";
import useStripeSession from "@utils/hooks/useStripeSession";
import { Stripe } from "services/stripe";
import { useRouter } from "next/router";
import { createStripeRefund } from "@utils/createStripeRefund";
import { useTranslation } from "react-i18next";
import { errorToastOptions } from "@utils/toast/options";

type ParentEnrolledConfirmationPageProps = {
    student: Student;
    classId: number;
    stripeSessionId?: string;
    classPriceId?: string;
};

export const ParentEnrolledConfirmationPage: React.FC<ParentEnrolledConfirmationPageProps> = ({
    student,
    classId,
    stripeSessionId,
    classPriceId,
}): JSX.Element => {
    const { stripeSession, stripeSessionItems } = useStripeSession(stripeSessionId);
    const [enrolled, setEnrolled] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { t } = useTranslation(["form", "common"]);

    useEffect(() => {
        // Only create registration if stripe session is successful & product matches current class
        if (
            !enrolled &&
            stripeSession &&
            (stripeSession.payment_intent as Stripe.PaymentIntent).status === "succeeded" &&
            stripeSessionItems.some((item) => item.price.id === classPriceId)
        ) {
            createClassRegistration(student, classId).then((res) => {
                if (res.ok === true) {
                    setEnrolled(true);
                } else if (res.ok === false) {
                    createStripeRefund((stripeSession.payment_intent as Stripe.PaymentIntent).id);
                    router.push("/");
                    toast(
                        errorToastOptions(
                            t("toast.registrationFailed", { ns: "common" }),
                            t("toast.registrationFailedDesc", { ns: "common" }),
                        ),
                    );
                }
            });
        }
    }, [classId, stripeSession]);

    if (enrolled === false) return <Loading />;
    return (
        <Center>
            <VStack mt={120} mb={180}>
                <ApprovedIcon />
                <Text fontWeight="700" fontSize="24px" align="center" pt={5}>
                    {t("form.registered")}
                </Text>
                <Text maxW={512} textAlign="center" py={3}>
                    {t("form.registeredInfo")}
                </Text>
                <Link href="/class">
                    <Button
                        bg={"transparent"}
                        borderColor={colourTheme.colors.Blue}
                        borderWidth="2px"
                        borderStyle="solid"
                        px={10}
                        _active={{}}
                        fontWeight={"200"}
                        w="350px"
                        color={colourTheme.colors.Blue}
                    >
                        {t("nav.viewUpcoming", { ns: "common" })}
                    </Button>
                </Link>
                <Box pt={1} />
                <Link href="/">
                    <Button
                        color={"white"}
                        bg={colourTheme.colors.Blue}
                        px={10}
                        _hover={{
                            bg: colourTheme.colors.LightBlue,
                        }}
                        _active={{}}
                        fontWeight={"200"}
                        w="350px"
                    >
                        {t("nav.browseClasses", { ns: "common" })}
                    </Button>
                </Link>
            </VStack>
        </Center>
    );
};
