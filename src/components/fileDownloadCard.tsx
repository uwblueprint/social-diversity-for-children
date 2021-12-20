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
import convertToShortDateString from "@utils/convertToShortDateString";

type FileDownloadCardProps = {
    filePath: FileType;
    docName: string;
    docApproved: boolean | null;
    docUploadDate: Date;
    participantId: number;
    userEmail: string;
};

const FileDownloadCard: React.FC<FileDownloadCardProps> = ({
    filePath,
    docName,
    docApproved,
    participantId,
    docUploadDate,
    userEmail,
}): JSX.Element => {
    const [approvalState, setApprovalState] = useState<boolean | null>(docApproved);
    useEffect(() => {
        updateFileApproval(filePath, participantId, approvalState);
    }, [approvalState, participantId]);

    const { url: docLink } = useFileRetrieve(filePath, docName, userEmail);

    return (
        <Box
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
                <VStack alignItems="flex-start" w="full" h="full">
                    <Text fontSize="18px" marginTop="75px" as="u">
                        <Link href={docLink} color={colourTheme.colors.Blue} isExternal>
                            {docName}
                        </Link>
                    </Text>
                    <Text color={colourTheme.colors.Gray}>
                        Date Submitted: {convertToShortDateString(docUploadDate)}
                    </Text>
                </VStack>
                <Box justifyContent="flex-end" display="flex">
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
                        <MenuList flexDirection="column" display="flex" borderRadius="0px">
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
