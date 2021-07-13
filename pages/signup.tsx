import {
    Button,
    Box,
    Center,
    Text,
    Input,
    FormControl,
} from "@chakra-ui/react";

/**
 * This is the page that a user will use to either login or register
 * to the SDC platform as a parent of volunteer
 */
export default function Signupform(): JSX.Element {
    return (
        <Center h="500px" margin="10">
            <Box width="700px">
                <Center>
                    <Text fontWeight="700" fontSize="36px" margin="13">
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
                        marginBottom="70"
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
                        padding="5"
                        marginTop="100"
                    >
                        Next
                    </Button>
                </Center>
            </Box>
        </Center>
    );
}
