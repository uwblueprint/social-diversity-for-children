import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import FileUploadButton from "./FileUploadButton";
import { UploadIcon } from "./icons";
import { useTranslation } from "next-i18next";

type DrapAndDropProps = {
    setFiles: (files: File[]) => void;
};

// TODO could be a lot of refactor for actual drag and drop
// TODO detect mobile users and don't show d&d
const DragAndDrop: React.FC<DrapAndDropProps> = ({ setFiles }): JSX.Element => {
    const { t } = useTranslation("common");

    return (
        <Box width="500px" border="2px" borderStyle="dashed" borderColor="gray.500">
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
                <FileUploadButton setFiles={setFiles}>
                    {t("upload.browseFiles")}
                </FileUploadButton>
            </Center>
        </Box>
    );
};

export default DragAndDrop;
