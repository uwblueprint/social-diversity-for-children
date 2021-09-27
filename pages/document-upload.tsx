import { useRef, useState } from "react";
import { Button, Box, Center, Text, VStack } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import DragAndDrop from "@components/DragAndDrop";
export default function documentUpload(): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Wrapper>
            <VStack>
                <Center>
                    <Box width="700px" marginBottom="40px">
                        <Center>
                            <Text
                                fontWeight="700"
                                fontSize="36px"
                                margin="40px"
                            >
                                Upload Document
                            </Text>
                        </Center>
                        <Center>
                            <DragAndDrop setFiles={setFiles} />
                        </Center>
                    </Box>
                </Center>
                {files.map((file: File) => (
                    <Text key={file.name}>
                        Document uploaded: <u> {file.name} </u>
                    </Text>
                ))}
                <Center paddingBottom="40px">
                    {!!files.length && (
                        <Button
                            backgroundColor="#0C53A0"
                            borderColor="brand.400"
                            width="366px"
                            height="54px"
                            fontSize="16px"
                            fontWeight="400"
                            color="white"
                            border="1px"
                            mt="20px"
                        >
                            Submit
                        </Button>
                    )}
                </Center>
            </VStack>
        </Wrapper>
    );
}
