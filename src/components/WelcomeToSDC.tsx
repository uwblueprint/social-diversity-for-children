import {
    Box,
    Button,
    Flex,
    useBreakpointValue,
    Heading,
    HStack,
    Image,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

type WelcomeToSDCProps = {
    session: Session;
};

export const WelcomeToSDC: React.FC<WelcomeToSDCProps> = ({ session }) => {
    const { t } = useTranslation("common");
    const isMobileLayout = useBreakpointValue({ base: true, lg: false });

    // TODO remove test data and get new images
    const title = t("home.welcome");
    const desc1 = t("home.registration");
    const text1 = t("home.parentBrowse");
    const text2 = t("home.volunteerBrowse");
    const img1 =
        "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/active_kids_other/1800x1200_active_kids_other_alt.jpg";
    const img2 =
        "https://www.verywellfamily.com/thmb/dIuXfSzEeILbXa3aSSLuU1xvFR8=/2121x1414/filters:fill(D7DFF5,1)/children-running-in-park-537632931-5c49f59d46e0fb00016e2ad6.jpg";

    return (
        <Tabs>
            <TabList>
                <Tab _focus={{}} _active={{}} color={colourTheme.colors.Blue}>
                    {t("home.parents")}
                </Tab>
                <Tab _focus={{}} _active={{}} color={colourTheme.colors.Blue}>
                    {t("home.volunteers")}
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <HStack spacing="24px">
                        <Box w={!isMobileLayout ? "50%" : "100%"}>
                            <VStack spacing="20px" alignItems="left">
                                <Heading fontSize="3xl">{title}</Heading>
                                <Text fontSize={{ base: "lg", lg: "2xl" }}>
                                    {desc1}
                                </Text>
                                <Text>{text1}</Text>
                                {session ? (
                                    <span />
                                ) : (
                                    <Link href="/login">
                                        <Button
                                            color="white"
                                            backgroundColor={
                                                colourTheme.colors.Blue
                                            }
                                            _hover={{
                                                backgroundColor:
                                                    colourTheme.colors
                                                        .LightBlue,
                                            }}
                                            width={{ base: "100%", md: "50%" }}
                                            borderRadius="6px"
                                            fontWeight={"200"}
                                        >
                                            {t("home.registerNow")}
                                        </Button>
                                    </Link>
                                )}
                            </VStack>
                        </Box>
                        {!isMobileLayout && (
                            <Box width="50%">
                                <Flex direction="column" align="flex-end">
                                    <Box maxWidth="sm" maxHeight="sm">
                                        <Image src={img1} objectFit="cover" />
                                    </Box>
                                </Flex>
                            </Box>
                        )}
                    </HStack>
                </TabPanel>
                <TabPanel>
                    <HStack spacing="24px">
                        <Box w={!isMobileLayout ? "50%" : "100%"}>
                            <VStack spacing="20px" alignItems="left">
                                <Heading fontSize="3xl">{title}</Heading>
                                <Text fontSize={{ base: "lg", lg: "2xl" }}>
                                    {desc1}
                                </Text>
                                <Text>{text2}</Text>
                                {session ? (
                                    <span />
                                ) : (
                                    <Link href="/login">
                                        <Button
                                            color="white"
                                            backgroundColor={
                                                colourTheme.colors.Blue
                                            }
                                            _hover={{
                                                backgroundColor:
                                                    colourTheme.colors
                                                        .LightBlue,
                                            }}
                                            width="50%"
                                            borderRadius="6px"
                                            fontWeight={"200"}
                                        >
                                            {t("home.registerNow")}
                                        </Button>
                                    </Link>
                                )}
                            </VStack>
                        </Box>
                        {!isMobileLayout && (
                            <Box width="50%">
                                <Flex direction="column" align="flex-end">
                                    <Box maxWidth="sm" maxHeight="sm">
                                        <Image src={img2} objectFit="cover" />
                                    </Box>
                                </Flex>
                            </Box>
                        )}
                    </HStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
