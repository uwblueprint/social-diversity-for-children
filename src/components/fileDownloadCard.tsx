import React, { useEffect, useState } from "react";
import useFileRetrieve from "@utils/hooks/useFileRetrieve";
import {
    Box,
    HStack,
    Icon,
    Link,
    Text,
    VStack,
    Menu,
    MenuList,
    MenuButton,
    MenuDivider,
    MenuItem,
} from "@chakra-ui/react";
import { MdDescription } from "react-icons/md";
import colourTheme from "@styles/colours";
import { updateFileApproval } from "@utils/updateFileApproval";
import { FileType } from "@utils/enum/filetype";

type FileDownloadCardProps = {
    filePath: FileType;
    docName: string;
    docApproved: boolean | null;
    participantId: number;
    userEmail: string;
};

const FileDownloadCard: React.FC<FileDownloadCardProps> = ({
    filePath,
    docName,
    docApproved,
    participantId,
    userEmail,
}): JSX.Element => {
    const [approvalState, setApprovalState] = useState<boolean | null>(
        docApproved,
    );
    useEffect(() => {
        updateFileApproval(filePath, participantId, approvalState);
    }, [approvalState, participantId]);

    const {
        url: docLink,
        isLoading: criminalRecordIsLoading,
        error: criminalRecordError,
    } = useFileRetrieve(filePath, docName, userEmail);

    return (
        <Box
            borderWidth="1px"
            borderColor="#C1C1C1"
            width="full"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            height="200px"
        >
            <HStack w="full" h="full" alignItems="flex-start" spacing="10px">
                <Icon
                    as={MdDescription}
                    color={colourTheme.colors.Blue}
                    w={110}
                    h={110}
                    marginLeft="40px"
                    marginTop="40px"
                />
                <VStack alignItems="flex-start" w="300px" h="full">
                    <Text fontSize="18px" marginTop="75px" as="u">
                        <Link
                            href={docLink}
                            color={colourTheme.colors.Blue}
                            isExternal
                        >
                            {docName}
                        </Link>
                    </Text>
                </VStack>
                <Box width="full" justifyContent="flex-end" display="flex">
                    <Menu>
                        <MenuButton
                            width="125px"
                            height="32px"
                            backgroundColor={colourTheme.colors.Blue}
                            color={"white"}
                            borderRadius="56px"
                            fontWeight="normal"
                            fontSize="12px"
                            marginTop="25px"
                            marginRight="20px"
                        >
                            {" "}
                            {approvalState === true
                                ? "Approved"
                                : approvalState === null
                                ? "Pending"
                                : "Declined"}
                        </MenuButton>
                        <MenuList
                            flexDirection="column"
                            display="flex"
                            borderRadius="0px"
                        >
                            <MenuItem
                                onClick={() => {
                                    setApprovalState(true);
                                }}
                            >
                                Approved
                            </MenuItem>
                            <MenuDivider alignSelf="center" w="90%" />
                            <MenuItem
                                onClick={() => {
                                    setApprovalState(null);
                                }}
                            >
                                Pending
                            </MenuItem>
                            <MenuDivider alignSelf="center" w="90%" />
                            <MenuItem
                                onClick={() => {
                                    setApprovalState(false);
                                }}
                            >
                                Declined
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </Box>
    );
};

export default FileDownloadCard;
