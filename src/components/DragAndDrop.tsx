import React from "react";
import { Box, Center, Text, Image } from "@chakra-ui/react";
import FileUploadButton from "./FileUploadButton";

type DrapAndDropProps = {
    setFiles: (files: File[]) => void;
};

// TODO could be a lot of refactor for actual drag and drop
// TODO detect mobile users and don't show d&d
const DragAndDrop: React.FC<DrapAndDropProps> = ({ setFiles }): JSX.Element => {
    return (
        <Box
            width="500px"
            border="2px"
            borderStyle="dashed"
            borderColor="gray.500"
        >
            <Center>
                {/* TODO use svg and local image */}
                <Image
                    src="http://www.clker.com/cliparts/S/j/7/o/b/H/cloud-upload-outline.svg.thumb.png"
                    mt="20px"
                ></Image>
            </Center>
            <Center>
                <Text fontWeight="400" fontSize="18px" mt="18px">
                    Drag and drop your file here
                </Text>
            </Center>
            <Center>
                <Text fontWeight="400" fontSize="18px" mt="18px">
                    or
                </Text>
            </Center>

            <Center mb="40px">
                <FileUploadButton setFiles={setFiles}>
                    Browse Files
                </FileUploadButton>
            </Center>
        </Box>
    );
};

export default DragAndDrop;
