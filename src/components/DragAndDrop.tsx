import React from "react";
import { Box, Center, Text, Image } from "@chakra-ui/react";
import FileUploadButton from "./FileUploadButton";

type DrapAndDropProps = {
    setFiles: (files: File[]) => void;
};

const DragAndDrop: React.FC<DrapAndDropProps> = ({ setFiles }): JSX.Element => {
    return (
        <Box
            width="500px"
            border="2px"
            borderStyle="dashed"
            borderColor="gray.500"
        >
            <Center>
                <Image
                    src="http://www.clker.com/cliparts/S/j/7/o/b/H/cloud-upload-outline.svg.thumb.png"
                    marginTop="20px"
                ></Image>
                {/* <Image src=""></Image> */}
            </Center>
            <Center>
                <Text
                    fontWeight="400"
                    fontSize="18px"
                    mt="18px"
                    marginTop="20px"
                >
                    Drag and drop your file here
                </Text>
            </Center>
            <Center>
                <Text fontWeight="400" fontSize="18px" mt="18px">
                    or
                </Text>
            </Center>

            <Center marginBottom="40px">
                <FileUploadButton setFiles={setFiles}>
                    Browse Files
                </FileUploadButton>
            </Center>
        </Box>
    );
};

export default DragAndDrop;
