import React from "react";
import {
    Box,
    HStack,
    VStack,
    Heading,
    Text,
    Image,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
} from "@chakra-ui/react";

export const WelcomeToSDC: React.FC = () => {
    // TODO remove test data and get new images
    const title = "Welcome to SDC";
    const desc1 = "Registration for Summer 2021 classes begins June 31, 2021!";
    const list1 =
        "Browse through programs below and then select the day/time preferred! We make sure that 100% of our participants' demonstrated needs are met.";
    const list2 =
        "For volunteers, create an account to volunteer for SDC and then select the program you want to volunteer for!";
    const img1 =
        "https://user-images.githubusercontent.com/4568003/42373481-4c4b04ac-8115-11e8-97de-d25181aeddfd.png";
    const img2 =
        "https://cdn.icon-icons.com/icons2/2248/PNG/512/hand_heart_icon_137523.png";
    const bigImg =
        "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/active_kids_other/1800x1200_active_kids_other_alt.jpg";
    return (
        <HStack spacing="24px">
            <Box w="50%">
                <VStack spacing="20px" alignItems="left">
                    <Heading fontSize="3xl">{title}</Heading>
                    <Text fontSize="2xl">{desc1}</Text>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                        <GridItem rowSpan={1} colSpan={1}>
                            <Image
                                src={img1}
                                maxWidth="100%"
                                maxHeight="100%"
                                objectFit="cover"
                            />
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={4}>
                            <Text>{list1}</Text>
                        </GridItem>

                        <GridItem rowSpan={1} colSpan={1}>
                            <Image
                                src={img2}
                                maxWidth="100%"
                                maxHeight="100%"
                                objectFit="cover"
                            />
                        </GridItem>
                        <GridItem rowSpan={1} colSpan={4}>
                            <Text>{list2}</Text>
                        </GridItem>
                    </Grid>
                    <Button
                        color="white"
                        backgroundColor="gray.600"
                        borderRadius="0"
                    >
                        Sign in to register/volunteer
                    </Button>
                </VStack>
            </Box>
            <Box width="50%">
                <Flex direction="column" align="flex-end">
                    <Box maxWidth="sm" maxHeight="sm">
                        <Image src={bigImg} objectFit="cover" />
                    </Box>
                </Flex>
            </Box>
        </HStack>
    );
};
