import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Box, Center, Text, VStack, Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import DragAndDrop from "@components/DragAndDrop";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import { ApprovedIcon } from "@components/icons";
import { Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type DocumentUploadProps = {
    session: Session;
};
export default function DocumentUpload({ session }: DocumentUploadProps): JSX.Element {
    const router = useRouter();
    const { t } = useTranslation("common");

    let { type } = router.query;
    const { redirect } = router.query;
    // sends file to other folder if type is not valid
    type = type && type.length > 0 ? type : "other";

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
                <BackButton />
                <VStack>
                    <Center>
                        <Box width={{ base: "90%", lg: "700px" }} mb="40px">
                            <Center>
                                <Text fontWeight="700" fontSize="36px" m="40px">
                                    {t("upload.title")}
                                </Text>
                            </Center>
                            <Center>
                                <DragAndDrop setFiles={setFiles} />
                            </Center>
                        </Box>
                    </Center>
                    {files.map((file: File) => (
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
            <Wrapper session={session}>
                <CloseButton href={redirect ? (redirect as string) : undefined} />
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
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
