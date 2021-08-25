import { Button, Box, Center, Text } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * This is the page that a user will use to either login or register
 * to the SDC platform as a parent of volunteer
 */
export default function Signupform(): JSX.Element {
    const router = useRouter();
    // hook to hold the url to redirect to
    const [url, setUrl] = useState("");
    return (
        <Wrapper>
            <Center h="500px" margin="10px">
                <Box width="700px">
                    <Center>
                        <Text fontWeight="700" fontSize="36px" margin="13px">
                            Sign Up
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="18px" mt="18px">
                            I am a ...
                        </Text>
                    </Center>
                    <Center>
                        <Button
                            backgroundColor="transparent"
                            borderColor="brand.400"
                            width="366px"
                            height="54px"
                            fontSize="16px"
                            fontWeight="400"
                            border="1px"
                            mt="20px"
                            onClick={() => setUrl("/participant-info")}
                        >
                            Parent
                        </Button>
                    </Center>
                    <Center>
                        <Button
                            backgroundColor="transparent"
                            borderColor="brand.400"
                            width="366px"
                            height="54px"
                            fontSize="16px"
                            fontWeight="400"
                            border="1px"
                            mt="20px"
                            marginBottom="70px"
                            // TODO: Set URL to "/volunteer-info" after it is completed
                            onClick={() => setUrl("/")}
                        >
                            Volunteer
                        </Button>
                    </Center>
                    <Center>
                        <Button
                            backgroundColor="brand.500"
                            color="brand.100"
                            width="366px"
                            height="44px"
                            fontSize="14px"
                            fontWeight="400"
                            mt="20px"
                            padding="5px"
                            marginTop="100px"
                            onClick={() => router.push(url)}
                        >
                            Next
                        </Button>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}
