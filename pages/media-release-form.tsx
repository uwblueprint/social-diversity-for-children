import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { Flex, Button, Text, Checkbox, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { CloseButton } from "@components/CloseButton";
import { useRouter } from "next/router";

export default function MediaReleaseForm(): JSX.Element {
    // Next button is disabled by default, activates when a child is selected
    // Test data to be replaced with children associated with parent during integration
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const router = useRouter();

    return (
        <Wrapper>
            <Flex justifyContent="space-between">
                <BackButton />
                {/* navigate to browse programs page instead of going back */}
                <CloseButton href="/" />
            </Flex>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    Media Release Form
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="50px">
                    If over the age of 19:
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    I hereby authorize any images or video footage of myself, in
                    whole or in part, individually or in conjunction with other
                    images and video footage to be displayed on the Social
                    Diversity for Children Foundation Website and other official
                    channels by Social Diversity for Children Foundation or its
                    partners, sponsors, or affiliated entities, and to be used
                    for media purposes including promotional presentations,
                    marketing campaigns, paper media, broadcast media,
                    brochures, pamphlets, materials, books, and all other
                    avenues. I also authorize any media material created by
                    myself within the Social Diversity for Children Foundation.
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    I waive rights to privacy and compensation, which I may have
                    in connection with such use of my name and likeness,
                    inlcuding rights to be written copy that may be created in
                    connection with video production, editing, and promotion
                    therewith.
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="30px">
                    If under the age of 19:
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    I hereby authorize any images or video footage taken of my
                    youth (under 18 years of age), in whole or in part,
                    individually or in conjunction with other iamge and video
                    footage, to be displayed on the Social Diversity for
                    Children Foundation and other official channels by Social
                    Diversity for Children Foundation or its partners, sponsors,
                    or affiliated entities, and to be used form edia purposes
                    including promotional presentations, marketing campaigns,
                    paper media, broadcast media, brochures, pamphlets,
                    materials, books, and all other avenues. I also authorize
                    the display and use of any media material created by my
                    youth within the Social Diversity for Children Foundaiton.
                </Text>
                <Text pb="60px" align="left" mt="30px">
                    I waive rights to privacy and compensation, which I may have
                    in connection with such use of my youth's name and likenss,
                    including rights to be written copy that may be created in
                    connection with video production, editing, and promotion
                    therewith. I am over 19 years-of-age and the parent or legal
                    guardian of the youth, and I have read this waiver and am
                    familiar with its content.
                </Text>
            </Box>
            <Box>
                <Checkbox
                    mb="80px"
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                >
                    I have read and agree to the terms above
                </Checkbox>
            </Box>
            <Box pb="50px">
                <Button
                    height="50px"
                    width="200px"
                    borderRadius="6px"
                    background={!acceptedTerms ? "#737373" : "#0C53A0"}
                    fontWeight="normal"
                    textColor="#FFFFFF"
                    fontSize="16px"
                    isDisabled={!acceptedTerms}
                    onClick={() => router.push("/participant-waiver")}
                >
                    Next
                </Button>
            </Box>
        </Wrapper>
    );
}
