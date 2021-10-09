import { useEffect, useState } from "react";
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
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import DragAndDrop from "@components/DragAndDrop";
// TODO session should be typed
export default function documentUpload({ session }): JSX.Element {
    const router = useRouter();
    let { type } = router.query;

    useEffect(() => {
        if (
            Object.keys(router.query).length === 0 &&
            Object.getPrototypeOf(router.query) === Object.prototype
        ) {
            type = "other";
        } else if (!("type" in router.query)) {
            console.log("Unsupported query parameter. Redirected");
            type = "other";
            router.push("/document-upload").then(() => {
                window.scrollTo({ top: 0 });
            });
        } else if (type === undefined) {
            console.log(
                "Query parameter not assigned. Upload will be sent to 'other'",
            );
            type = "other";
        } else if (type === "") {
            console.log(
                "Query parameter not assigned. Upload will be sent to 'other'",
            );
            type = "other";
            router.push("/document-upload").then(() => {
                window.scrollTo({ top: 0 });
            });
        }
    }, []);
    // if no query param specified

    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    // allows future support of multiple file uploads
    // if we really want to restrict to one document, remove the multiple from the input
    const [files, setFiles] = useState<File[]>([]);
    const upload = async () => {
        setIsUploading(true);
        const file = files[0];
        try {
            // TODO don't prefix file name, instead put random file name into database eventually
            // TODO randomize filename
            const res = await fetch(
                `/api/upload/url?path=${type}&file=${session.user.email}-${session.id}-${file.name}`,
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
        } catch (e) {
            console.log(e);
        }
        setIsUploading(false);
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
                                    onClick={() =>
                                        router.push("/myaccounts").then(() => {
                                            window.scrollTo({ top: 0 });
                                        })
                                    }
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
                                    onClick={() =>
                                        router.push("/").then(() => {
                                            window.scrollTo({ top: 0 });
                                        })
                                    }
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

export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
