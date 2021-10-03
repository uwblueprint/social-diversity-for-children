import React from "react";
import {
    VStack,
    FormLabel,
    FormControl,
    Stack,
    Checkbox,
    Textarea,
} from "@chakra-ui/react";

type VolunteerSkillsPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerSkillsInfo;
};

type VolunteerSkillsInfo = {
    skills: any;
    setSkills: any;
    heardFrom: any;
    setHeardFrom: any;
};

export const VolunteerSkillsPage: React.FC<VolunteerSkillsPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <VStack>
                <FormControl id="skills">
                    <FormLabel>
                        Skills/Experience (ex. Arts and Crafts, Music, First-Aid
                        Certificates, Teaching or Volunteering Experience,
                        Experience with Children with Special Needs)
                    </FormLabel>
                    <Textarea
                        placeholder="Type here"
                        size="sm"
                        onChange={(e) => props.setSkills(e.target.value)}
                        value={props.skills}
                    ></Textarea>
                </FormControl>
                <FormControl id="hear-about-us">
                    <FormLabel>
                        How Did You Hear About this Volunteer Opportunity?
                    </FormLabel>
                    <Textarea
                        placeholder="Type here"
                        size="sm"
                        onChange={(e) => props.setHeardFrom(e.target.value)}
                        value={props.heardFrom}
                    ></Textarea>
                </FormControl>
                <FormControl id="commit">
                    {/* TODO: make mandatory before proceeding with rest of form */}
                    <Stack direction="column">
                        <Checkbox>
                            I certify that I will commit to attending all
                            volunteer sessions I sign up for
                        </Checkbox>
                    </Stack>
                </FormControl>
            </VStack>
        </>
    );
};
