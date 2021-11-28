import {
    OrderedList,
    ListItem,
    Flex,
    Text,
    Checkbox,
    Box,
    Button,
    Link,
} from "@chakra-ui/react";
import { ClassCardInfo } from "@models/Class";
import colourTheme from "@styles/colours";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type UpdateCriminalCheckFormProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
    classInfo: ClassCardInfo;
};
/**
 * Media release page within the class registration process
 * @returns a page component explaining SDC's media release policy and offering an option to accept it
 */
export const UpdateCriminalCheckForm: React.FC<UpdateCriminalCheckFormProps> = ({
    onNext,
    classInfo,
}): JSX.Element => {
    // Next button is disabled by default, activates criminal checkbox is checked
    const [criminalCheck, setCriminalCheck] = useState<boolean>(false);
    const { t } = useTranslation("form");

    return (
        <>
            <Flex justifyContent="space-between"></Flex>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    {t("bgc.updateTitle")}
                </Text>
            </Box>
            <Box>
                <Text
                    pb="5px"
                    align="left"
                    fontWeight="700"
                    mt="50px"
                    fontSize="22px"
                >
                    {t("bgc.expired")}
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    {t("bgc.desc1")}
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    {t("bgc.desc2")}
                </Text>
            </Box>
            <Box>
                <Text
                    pb="5px"
                    align="left"
                    fontWeight="700"
                    mt="50px"
                    fontSize="22px"
                >
                    {t("bgc.instruction")}
                </Text>
                <OrderedList pb="5px" align="left" mt="30px">
                    <ListItem>{t("bgc.instruction1")}</ListItem>
                    <ListItem>{t("bgc.instruction2")}</ListItem>
                    <ListItem>{t("bgc.instruction3")}</ListItem>
                    <ListItem>{t("bgc.instruction3")}</ListItem>
                </OrderedList>
            </Box>
            <Box>
                <Link
                    href={`/document-upload?type=criminal-check&redirect=/volunteer/enrollment?classId=${classInfo.id}%26page=1`}
                >
                    <Button
                        mt="40px"
                        width={"288px"}
                        height={"49px"}
                        color={colourTheme.colors.OxfordBlue}
                        bg={"#E2E8F0"}
                        px={10}
                        _active={{}}
                        fontWeight={"400"}
                        borderRadius={"6px"}
                    >
                        {t("bgc.upload")}
                    </Button>
                </Link>
            </Box>
            <Box>
                <Checkbox
                    mt="75px"
                    onChange={() => setCriminalCheck(!criminalCheck)}
                >
                    {t("bgc.firstDayProvide")}
                </Checkbox>
            </Box>

            <Box pb="50px" mt="45px">
                <Button
                    height="50px"
                    width="200px"
                    borderRadius="6px"
                    background={
                        !criminalCheck ? "darkgray" : colourTheme.colors.Blue
                    }
                    fontWeight="normal"
                    fontSize="16px"
                    isDisabled={!criminalCheck}
                    color="white"
                    onClick={onNext}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
