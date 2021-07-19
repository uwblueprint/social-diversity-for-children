import React from "react";
import { Box, Container, Link, Stack, Text } from "@chakra-ui/react";

const SocialMediaLinks = [
    { name: "Instagram", href: "https://www.instagram.com/sdcfdn/" },
    { name: "Facebook", href: "https://www.facebook.com/SDCFdn/" },
    { name: "Twitter", href: "https://twitter.com/sdcfdn?lang=en" },
    {
        name: "Youtube",
        href: "https://www.youtube.com/channel/UCymsaZJeBmGa0iHlAn_GPjg",
    },
];

export const Footer: React.FC = () => {
    return (
        <Box bg={"#0C53A0"} color={"white"} px={48}>
            <Container
                as={Stack}
                maxW={"100%"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
                <Stack>
                    <Text fontWeight={700} py={8}>
                        Social Diversity for Children Foundation
                    </Text>
                    <Stack fontSize={"sm"} spacing={1}>
                        <Text>Suite 203 - 815 Hornby St.</Text>
                        <Text>Vancouver, BC V6Z 2E6, Canada</Text>
                        <Link
                            textDecoration={"underline"}
                            href={"tel:+1888-247-5071"}
                        >
                            +1 (888)-247-5071
                        </Link>
                        <Link
                            textDecoration={"underline"}
                            href={"mailto:info@socialdiversity.org"}
                        >
                            info@socialdiversity.org
                        </Link>
                    </Stack>
                    <Text fontSize={"sm"} pt={4} pb={8}>
                        © Social Diversity for Children Foundation 2020
                    </Text>
                </Stack>
                <Stack spacing={4}>
                    <Text fontWeight={700}>Follow</Text>
                    {SocialMediaLinks.map((linkInfo) => (
                        <Link
                            target={"_blank"}
                            textDecoration={"underline"}
                            href={linkInfo.href}
                        >
                            {linkInfo.name}
                        </Link>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};
