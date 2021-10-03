import React from "react";
import {
    Box,
    Text,
    Heading,
    UnorderedList,
    ListItem,
    OrderedList,
} from "@chakra-ui/react";

type IncomePageProps = {
    styleProps?: Record<string, unknown>;
    PROOF_OF_INCOME_EXAMPLES: string[];
    UPLOADING_PROOF_OF_INCOME: string[];
};

export const IncomePage: React.FC<IncomePageProps> = ({
    PROOF_OF_INCOME_EXAMPLES,
    UPLOADING_PROOF_OF_INCOME,
}): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Text fontSize="16px" fontWeight="200" mb="60px">
                    Upload a Proof of Income to recieve automated discounts on
                    classes you take!
                </Text>
                <Heading fontSize="22px" fontWeight="900">
                    Examples of Proof of Income Include
                </Heading>
                <br />
                <UnorderedList margin="10px" fontSize="16px" fontWeight="400">
                    {PROOF_OF_INCOME_EXAMPLES.map((poi, idx) => (
                        <ListItem key={idx} mx="20px">
                            {poi}
                        </ListItem>
                    ))}
                </UnorderedList>
                <br />
                <Heading fontSize="22px" fontWeight="900">
                    Uploading your Proof of Income
                </Heading>
                <br />
                <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                    {UPLOADING_PROOF_OF_INCOME.map((poi, idx) => (
                        <ListItem key={idx} mx="20px">
                            {poi}
                        </ListItem>
                    ))}
                </OrderedList>
            </Box>
        </>
    );
};
