import { useRef, useState } from "react";
import {
    Button,
    Box,
    Center,
    Text,
    Image,
    FormControl,
    Input,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import DragAndDrop from "@components/DragAndDrop";
export default function documentUpload(): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Wrapper>
            <Center h="500px" margin="10px" marginBottom="50px">
                <Box width="700px" marginBottom="40px">
                    <Center>
                        <Text fontWeight="700" fontSize="36px" margin="40px">
                            Upload Document
                        </Text>
                    </Center>
                    <Center marginBottom="40px">
                        <DragAndDrop setFiles={setFiles} />
                    </Center>
                    <Center>
                        {files.map((file: File) => (
                            <Text key={file.name}>
                                Document uploaded: <u> {file.name} </u>
                            </Text>
                        ))}
                    </Center>
                    <Center marginBottom="50px">
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
                </Box>
            </Center>
        </Wrapper>
    );
}
