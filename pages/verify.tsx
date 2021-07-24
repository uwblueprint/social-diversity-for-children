import { Box, Center, Text, Image, Link } from "@chakra-ui/react";
import useLocalStorage from "@utils/useLocalStorage";
import Wrapper from "@components/SDCWrapper";

export default function Verify(): JSX.Element {
    const [localStorageEmail] = useLocalStorage("sdc-email-verification", "");
    const logoSrc = "/images/sdc-logo-blue.png";
    return (
        <Wrapper>
            <Center h="500px" mt={12} mb={16}>
                <Box width="700px">
                    <Center>
                        <Box>
                            <Image
                                w={150}
                                py={15}
                                src={logoSrc}
                                alt="SDC Logo"
                            ></Image>
                        </Box>
                    </Center>
                    <Center>
                        <Text
                            fontWeight="700"
                            fontSize="24px"
                            align="center"
                            mt="50px"
                        >
                            A verification email has been sent.
                            <br></br>
                            Check your email!
                        </Text>
                    </Center>
                    <Center>
                        <Text
                            fontWeight="400"
                            fontSize="16px"
                            align="center"
                            mt="40px"
                        >
                            To confirm your email address, click on the link in
                            the email we sent to{" "}
                            <Link
                                textDecoration={"underline"}
                                href={`mailto:${localStorageEmail}`}
                            >
                                <u>
                                    <b>{localStorageEmail}</b>
                                </u>
                            </Link>
                            .<br></br>
                        </Text>
                    </Center>
                    <Center>
                        <Text
                            fontWeight="400"
                            fontSize="14px"
                            mt="60px"
                            color="brand.300"
                        >
                            Didn’t get an email? Return to the{" "}
                            <Link
                                _hover={{ textDecoration: "none" }}
                                href="/login"
                            >
                                <Text as="u">Sign In</Text>
                            </Link>{" "}
                            page and re-enter a valid email.
                        </Text>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}
