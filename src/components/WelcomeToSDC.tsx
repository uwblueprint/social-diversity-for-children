import React from "react";
import { useSession } from "next-auth/client";
import {
    Box,
    HStack,
    VStack,
    Heading,
    Text,
    Image,
    Button,
    Flex,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

type WelcomeToSDCProps = {
    session: Record<string, unknown>;
};

export const WelcomeToSDC: React.FC<WelcomeToSDCProps> = ({ session }) => {
    const goToLogin = () => {
        window.location.href = "/login";
    };

    // TODO remove test data and get new images
    const title = "Welcome to SDC";
    const desc1 = "Registration for Summer 2021 classes begins June 31, 2021!";
    const text1 =
        "Browse through programs below and then select the day/time preferred! We make sure that 100% of our participants' demonstrated needs are met.";
    const text2 =
        "For volunteers, create an account to volunteer for SDC and then select the program you want to volunteer for!";
    const img1 =
        "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/active_kids_other/1800x1200_active_kids_other_alt.jpg";
    const img2 =
        "https://www.verywellfamily.com/thmb/dIuXfSzEeILbXa3aSSLuU1xvFR8=/2121x1414/filters:fill(D7DFF5,1)/children-running-in-park-537632931-5c49f59d46e0fb00016e2ad6.jpg";

    return (
        <Tabs>
            <TabList>
                <Tab _focus={{}} _active={{}} color="#0C53A0">
                    Parents
                </Tab>
                <Tab _focus={{}} _active={{}} color="#0C53A0">
                    Volunteers
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <HStack spacing="24px">
                        <Box w="50%">
                            <VStack spacing="20px" alignItems="left">
                                <Heading fontSize="3xl">{title}</Heading>
                                <Text fontSize="2xl">{desc1}</Text>
                                <Text>{text1}</Text>
                                {session ? (
                                    <span />
                                ) : (
                                    <Button
                                        color="white"
                                        backgroundColor="#0C53A0"
                                        _hover={{ backgroundColor: "#2C6AAD" }}
                                        width="50%"
                                        onClick={goToLogin}
                                        borderRadius={100}
                                        fontWeight={"200"}
                                    >
                                        Register now
                                    </Button>
                                )}
                            </VStack>
                        </Box>
                        <Box width="50%">
                            <Flex direction="column" align="flex-end">
                                <Box maxWidth="sm" maxHeight="sm">
                                    <Image src={img1} objectFit="cover" />
                                </Box>
                            </Flex>
                        </Box>
                    </HStack>
                </TabPanel>
                <TabPanel>
                    <HStack spacing="24px">
                        <Box w="50%">
                            <VStack spacing="20px" alignItems="left">
                                <Heading fontSize="3xl">{title}</Heading>
                                <Text fontSize="2xl">{desc1}</Text>
                                <Text>{text2}</Text>
                                {session ? (
                                    <span />
                                ) : (
                                    <Button
                                        color="white"
                                        backgroundColor="#0C53A0"
                                        _hover={{ backgroundColor: "#2C6AAD" }}
                                        width="50%"
                                        onClick={goToLogin}
                                        borderRadius={100}
                                        fontWeight={"200"}
                                    >
                                        Register now
                                    </Button>
                                )}
                            </VStack>
                        </Box>
                        <Box width="50%">
                            <Flex direction="column" align="flex-end">
                                <Box maxWidth="sm" maxHeight="sm">
                                    <Image src={img2} objectFit="cover" />
                                </Box>
                            </Flex>
                        </Box>
                    </HStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
