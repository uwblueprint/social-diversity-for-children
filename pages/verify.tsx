import { Box, Center, Text } from "@chakra-ui/react";
import useLocalStorage from "@utils/useLocalStorage";

export default function Verify(): JSX.Element {
    const [localStorageEmail] = useLocalStorage("sdc-email-verification", "");
    return (
        <Center h="500px">
            <Box width="700px">
                <Center>
                    <Text fontWeight="425" fontSize="lg" mt="15px">
                        An email has been sent to{" "}
                        <u>
                            <b>{localStorageEmail}</b>
                        </u>
                        ! <br></br>
                    </Text>
                </Center>
                <Center>
                    <Text fontWeight="425" fontSize="lg" mt="10px">
                        There should be a magic link to log in!
                    </Text>
                </Center>
            </Box>
        </Center>
    );
}
