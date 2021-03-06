import { Box, Button, Center, Spinner, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import DragAndDrop from "@components/DragAndDrop";
import { ApprovedIcon } from "@components/icons";
import Wrapper from "@components/SDCWrapper";
import { pathWithQuery } from "@utils/request/query";
import { GetServerSideProps } from "next"; // Get server side props
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";

type DocumentUploadProps = {
    session: Session;
};
export default function DocumentUpload({ session }: DocumentUploadProps): JSX.Element {
    const router = useRouter();
    const { t } = useTranslation(["common", "form"]);
    const isMobileDevice = useBreakpointValue({ base: true, md: false });

    let { type } = router.query;
    const { redirect } = router.query;
    // sends file to other folder if type is not valid
    type = type && type.length > 0 ? type : "other";

    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    // allows future support of multiple file uploads
    // if we really want to restrict to one document, remove the multiple from the input
    const [files, setFiles] = useState<File[]>([]);
    const [fileName, setFileName] = useState<string>();

    const upload = async () => {
        setIsUploading(true);
        const file = files[0];
        try {
            const res = await fetch(`/api/file/upload?path=${type}&file=${file.name}`);
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
                setFileName(file.name);
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
            <Wrapper session={session}>
                <Box minHeight="85vh">
                    <BackButton />
                    <VStack>
                        <Center>
                            <Box width={{ base: "90%", lg: "700px" }} mb="40px">
                                <Center
                                    fontWeight="700"
                                    fontSize={isMobileDevice ? "30px" : "36px"}
                                    my={isMobileDevice ? "20px" : "40px"}
                                    mx={isMobileDevice ? undefined : "40px"}
                                >
                                    {t("upload.title")}
                                </Center>
                                <Center>
                                    <DragAndDrop
                                        setFiles={setFiles}
                                        files={files}
                                        isMobileDevice={isMobileDevice}
                                    />
                                </Center>
                            </Box>
                        </Center>
                        {!isMobileDevice &&
                            files.map((file: File) => (
                                <Text key={file.name}>
                                    {t("upload.uploaded")}: <u> {file.name} </u>
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
                                    position={isMobileDevice ? "absolute" : undefined}
                                    top={isMobileDevice ? "85vh" : undefined}
                                    onClick={upload}
                                >
                                    {t("upload.submit")}
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
                                    position={isMobileDevice ? "absolute" : undefined}
                                    top={isMobileDevice ? "85vh" : undefined}
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
                </Box>
            </Wrapper>
        );
    };

    const uploadSuccessUI = (): JSX.Element => {
        return (
            <Wrapper session={session}>
                <Box minHeight="85vh">
                    <CloseButton
                        href={
                            redirect
                                ? pathWithQuery(redirect as string, "uploaded", fileName)
                                : undefined
                        }
                    />
                    <VStack>
                        <Center>
                            <Box width="400px" mb="40px">
                                <Center>
                                    <ApprovedIcon />
                                </Center>
                                <Center>
                                    <Text fontWeight="700" fontSize="25px" m="20px">
                                        {t("upload.success")}
                                    </Text>
                                </Center>
                                <Center>
                                    <Text fontWeight="200" fontSize="15px" mb="20px">
                                        {t("upload.successInfo")}
                                    </Text>
                                </Center>
                                <Center>
                                    <Text
                                        fontWeight="200"
                                        fontSize="15px"
                                        mb="20px"
                                        textAlign={["center"]}
                                    >
                                        {t("upload.successHint")}
                                    </Text>
                                </Center>
                                {redirect && redirect !== "/myaccounts" ? (
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
                                                router
                                                    .push(
                                                        redirect
                                                            ? pathWithQuery(
                                                                  redirect as string,
                                                                  "uploaded",
                                                                  fileName,
                                                              )
                                                            : "/",
                                                    )
                                                    .then(() => {
                                                        window.scrollTo({ top: 0 });
                                                    })
                                            }
                                        >
                                            {t("form.continue", { ns: "form" })}
                                        </Button>
                                    </Center>
                                ) : (
                                    <>
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
                                                {t("nav.viewAccount")}
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
                                                {t("nav.browseProgram")}
                                            </Button>
                                        </Center>
                                    </>
                                )}
                            </Box>
                        </Center>
                    </VStack>
                </Box>
            </Wrapper>
        );
    };

    if (uploadSuccess) {
        return uploadSuccessUI();
    } else {
        return uploadDocumentUI();
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common", "form"])),
        },
    };
};
