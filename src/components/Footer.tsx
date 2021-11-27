import React from "react";
import {
    Box,
    Container,
    Flex,
    Link,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";

type FooterProps = {
    height?: number | string;
};

const SocialMediaLinks = [
    { name: "Instagram", href: "https://www.instagram.com/sdcfdn/" },
    { name: "Facebook", href: "https://www.facebook.com/SDCFdn/" },
    { name: "Twitter", href: "https://twitter.com/sdcfdn?lang=en" },
    {
        name: "Youtube",
        href: "https://www.youtube.com/channel/UCymsaZJeBmGa0iHlAn_GPjg",
    },
];

export const DEFAULT_FOOTER_HEIGHT = 364;

export const Footer: React.FC<FooterProps> = (props) => {
    return (
        <Box
            bg={"#0C53A0"}
            color={"white"}
            px={{ base: 4, lg: 48 }}
            position={"absolute"}
            bottom={0}
            width={"100%"}
        >
            <Container
                as={Stack}
                maxW={"100%"}
                py={6}
                spacing={4}
                justify={"center"}
                minHeight={props.height || DEFAULT_FOOTER_HEIGHT}
            >
                <Stack>
                    <Flex direction={{ base: "column", md: "row" }}>
                        <Stack fontSize={"sm"} spacing={1}>
                            <Text fontWeight={700} py={{ base: 2, md: 8 }}>
                                Social Diversity for Children Foundation
                            </Text>
                            <Text>Suite 203 - 815 Hornby St.</Text>
                            <Text>Vancouver, BC V6Z 2E6, Canada</Text>
                            <Link
                                key={"sdc-phone"}
                                textDecoration={"underline"}
                                href={"tel:+1888-247-5071"}
                            >
                                +1 (888)-247-5071
                            </Link>
                            <Link
                                key={"sdc-email"}
                                textDecoration={"underline"}
                                href={"mailto:info@socialdiversity.org"}
                            >
                                info@socialdiversity.org
                            </Link>
                        </Stack>
                        <Spacer />
                        <Stack fontSize={"sm"} py={8}>
                            <Text fontWeight={700}>Follow</Text>
                            {SocialMediaLinks.map((linkInfo) => (
                                <Link
                                    key={linkInfo.name}
                                    target={"_blank"}
                                    textDecoration={"underline"}
                                    href={linkInfo.href}
                                    _focus={{}}
                                >
                                    {linkInfo.name}
                                </Link>
                            ))}
                        </Stack>
                    </Flex>
                    <Text fontSize={"sm"} pb={4}>
                        © Social Diversity for Children Foundation 2021
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
};
