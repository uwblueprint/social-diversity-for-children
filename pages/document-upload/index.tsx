import { useState } from "react";
import { useRouter } from "next/router";
import {
    Button,
    Box,
    Center,
    Text,
    VStack,
    Spinner,
    Image,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import DragAndDrop from "@components/DragAndDrop";
export default function documentUpload(): JSX.Element {
    const router = useRouter();
    let { type } = router.query;
    if (type === undefined) {
        type = "other";
    }
    const [uploadSuccess, setUploadSuccess] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    // allows future support of multiple file uploads
    // if we really want to restrict to one document, remove the multiple from the input
    const [files, setFiles] = useState<File[]>([]);
    const upload = async () => {
        setIsUploading(true);
        const file = files[0];
        try {
            const res = await fetch(
                `/api/upload/url?path=${type}&file=${file.name}`,
            );
            const data = await res.json();
            const { url, fields } = data.data;
            const formData = new FormData();

            Object.entries({ ...fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
            });
            const fileUpload = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (fileUpload.ok) {
                console.log("Uploaded successfully!");
                setUploadSuccess(true);
            } else {
                // TODO
                console.error("Upload failed.");
                setUploadSuccess(false);
            }

            setIsUploading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const uploadDocumentUI = (): JSX.Element => {
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
                        {!!files.length && !isUploading && (
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
                                onClick={upload}
                            >
                                Submit
                            </Button>
                        )}
                        {isUploading && (
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
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            </Button>
                        )}
                    </Center>
                </VStack>
            </Wrapper>
        );
    };

    const uploadSuccessUI = (): JSX.Element => {
        return (
            <Wrapper>
                <VStack>
                    <Center>
                        <Box width="400px" marginBottom="40px">
                            <Center>
                                <Image
                                    src=""
                                    alt="TODO checkmark image"
                                ></Image>
                            </Center>
                            <Center>
                                <Text
                                    fontWeight="700"
                                    fontSize="25px"
                                    margin="20px"
                                >
                                    File submitted successfully
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    fontWeight="200"
                                    fontSize="15px"
                                    marginBottom="20px"
                                >
                                    Document was successfully sent to SDC.
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    fontWeight="200"
                                    fontSize="15px"
                                    marginBottom="20px"
                                    textAlign={["center"]}
                                >
                                    Keep and eye out on the status of your
                                    background check within the next few weeks.
                                </Text>
                            </Center>
                            <Center>
                                <Button
                                    backgroundColor="white"
                                    borderColor="brand.400"
                                    width="366px"
                                    height="54px"
                                    fontSize="16px"
                                    fontWeight="400"
                                    color="#0C53A0"
                                    border="2px"
                                    mt="20px"
                                >
                                    View Account
                                </Button>
                            </Center>
                            <Center>
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
                                    onClick={() => router.push("/")}
                                >
                                    Browse programs
                                </Button>
                            </Center>
                        </Box>
                    </Center>
                </VStack>
            </Wrapper>
        );
    };
    if (uploadSuccess) {
        return uploadSuccessUI();
    } else {
        return uploadDocumentUI();
    }
}
