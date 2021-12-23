import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import FileUploadButton from "./FileUploadButton";
import { UploadIcon } from "./icons";
import { useTranslation } from "next-i18next";
import { Bool } from "aws-sdk/clients/inspector";

type DragAndDropProps = {
    setFiles: (files: File[]) => void;
    files: File[];
    isMobileDevice: Bool;
};

// TODO could be a lot of refactor for actual drag and drop
// TODO detect mobile users and don't show d&d
const DragAndDrop: React.FC<DragAndDropProps> = ({
    setFiles,
    files,
    isMobileDevice,
}): JSX.Element => {
    const { t } = useTranslation("common");

    return (
        <Box
            width={isMobileDevice ? "none" : "500px"}
            border="2px"
            borderStyle={isMobileDevice ? "none" : "dashed"}
            borderColor="gray.500"
        >
            {!isMobileDevice ? (
                <Box>
                    <Center>
                        <Box mt="30px">
                            <UploadIcon />
                        </Box>
                    </Center>
                    <Center>
                        <Text fontWeight="bold" fontSize="18px" mt="18px">
                            {t("upload.instruction")}
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="18px" mt="18px">
                            {t("upload.alternative")}
                        </Text>
                    </Center>
                    <Center mb="40px">
                        <FileUploadButton setFiles={setFiles} changeBackground={false}>
                            {t("upload.browseFiles")}
                        </FileUploadButton>
                    </Center>
                </Box>
            ) : (
                <Box>
                    <Text>
                        {files.map((file: File) => (
                            <Text key={file.name}>
                                {t("upload.uploaded")}: <br />
                                <u> {file.name} </u>
                            </Text>
                        ))}
                    </Text>
                    <Text>{files.length === 0 && t("upload.prompt")}</Text>
                    <FileUploadButton
                        setFiles={setFiles}
                        changeBackground={files.length > 0 && isMobileDevice}
                    >
                        {t("upload.browseFiles")}
                    </FileUploadButton>
                </Box>
            )}
        </Box>
    );
};

export default DragAndDrop;
