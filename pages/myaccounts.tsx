import Wrapper from "@components/SDCWrapper";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    MdPersonOutline,
    MdAccountCircle,
    MdArticle,
    MdLogout,
} from "react-icons/md";
import {
    Box,
    Text,
    FormLabel,
    FormControl,
    Input,
    HStack,
    Select,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import colourTheme from "@styles/colours";
import { testCanadianPostalCode } from "@utils/validation/fields";
import { province } from "@models/User";

/**
 * This is the page that a user will use to edit their account information
 */
export default function Signupform(): JSX.Element {
    const props = {};
    const router = useRouter();

    const [editing, setEditing] = useState(false);

    const tempSideBar = [
        {
            name: "Christina Ru",
            icon: <MdAccountCircle size={35} />,
            onChange: null,
            title: "Personal Information",
        },
        {
            name: "Raewn Tsai",
            icon: <MdAccountCircle size={35} />,
            onChange: null,
            title: "Personal Information",
        },
        {
            name: "Stacy Kwok",
            icon: <MdAccountCircle size={35} />,
            onChange: null,
            title: "Personal Information",
        },
        {
            name: "",
            icon: <MdPersonOutline size={35} />,
            onChange: null,
            title: "Guardian Information",
        },
        {
            name: "",
            icon: <MdArticle size={35} />,
            onChange: null,
            title: "Proof of Income",
        },
        {
            name: "",
            icon: <MdLogout size={35} />,
            onChange: null,
            title: "log out",
        },
    ];

    return (
        <Wrapper>
            <div style={{ display: "flex" }}>
                <div style={{ width: 312, marginBottom: 50 }}>
                    <text
                        style={{
                            fontWeight: 700,
                            fontSize: 36,
                            marginBottom: 44,
                        }}
                    >
                        {"My Account"}
                    </text>
                    {tempSideBar.map((option) => (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 32,
                            }}
                        >
                            <br></br>
                            {option.icon}
                            <div style={{ marginLeft: 27 }}>
                                <p>{option.title}</p>
                                <p>
                                    {option.name ? "(" + option.name + ")" : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div
                        style={{
                            border: "1px solid",
                            width: 600,
                            marginTop: 87,
                            padding: 48,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {" "}
                            <text style={{ fontWeight: 700, fontSize: 24 }}>
                                {"General Information"}
                            </text>
                            <a style={{ marginLeft: 183 }}> Edit</a>
                        </div>
                        <>
                            <Box maxW="55rem">
                                <Text
                                    noOfLines={2}
                                    fontSize="16px"
                                    fontWeight="200"
                                >
                                    Please provide information on the
                                    participant that is being registered in the
                                    program. An opportunity to add information
                                    of additional participants you would like to
                                    register will be provided afterwards.
                                </Text>
                            </Box>
                            <HStack spacing="24px">
                                <FormControl
                                    id="participant-first-name"
                                    isRequired
                                    isInvalid={!props.participantFirstName}
                                >
                                    {" "}
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        isDisabled={true}
                                        placeholder="First name"
                                        onChange={(e) =>
                                            props.setParticipantFirstName(
                                                e.target.value,
                                            )
                                        }
                                        value={props.participantFirstName}
                                    />
                                    <FormErrorMessage>
                                        {"Required"}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    id="participant-last-name"
                                    isRequired
                                    isInvalid={!props.participantLastName}
                                >
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        placeholder="Last name"
                                        onChange={(e) =>
                                            props.setParticipantLastName(
                                                e.target.value,
                                            )
                                        }
                                        value={props.participantLastName}
                                    />
                                    <FormErrorMessage>
                                        {"Required"}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <FormControl id="date-of-birth" isRequired>
                                <FormLabel>Date Of Birth</FormLabel>
                                <div
                                    style={{
                                        border: "1px #E2E8F0 solid",
                                        padding: "10px",
                                        borderRadius: 7,
                                    }}
                                >
                                    <DatePicker
                                        dateFormat="yyyy-MM-dd"
                                        selected={
                                            Date.parse(props.dateOfBirth) ||
                                            moment().toDate()
                                        }
                                        onChange={(date) =>
                                            props.setDateOfBirth(date)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormControl
                                id="street-address-1"
                                isRequired
                                isInvalid={!props.address1}
                            >
                                <FormLabel>Street Address 1</FormLabel>
                                <Input
                                    placeholder="815 Hornby St."
                                    onChange={(e) =>
                                        props.setAddress1(e.target.value)
                                    }
                                    value={props.address1}
                                />
                                <FormErrorMessage>
                                    {"Required"}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id="street-address-2">
                                <FormLabel>Street Address 2</FormLabel>
                                <Input
                                    placeholder="Suite 203"
                                    onChange={(e) =>
                                        props.setAddress2(e.target.value)
                                    }
                                    value={props.address2}
                                />
                            </FormControl>
                            <HStack spacing="24px">
                                <FormControl
                                    id="city"
                                    isRequired
                                    isInvalid={!props.city}
                                >
                                    <FormLabel>City</FormLabel>
                                    <Input
                                        placeholder="Vancouver"
                                        onChange={(e) =>
                                            props.setCity(e.target.value)
                                        }
                                        value={props.city}
                                    />
                                    <FormErrorMessage>
                                        {"Required"}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="province" isRequired>
                                    <FormLabel>Province</FormLabel>
                                    <Select
                                        placeholder={"Select option"}
                                        onChange={(e) =>
                                            props.setParticipantProvince(
                                                province[e.target.value],
                                            )
                                        }
                                        value={props.participantProvince} // TODO: bug with displayed value after refresh
                                    >
                                        {Object.entries(province)
                                            .sort()
                                            .map((prov) => {
                                                const [key, val] = prov;
                                                return (
                                                    <option
                                                        key={key}
                                                        value={val}
                                                    >
                                                        {val}
                                                    </option>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    id="postal-code"
                                    isRequired
                                    isInvalid={
                                        !testCanadianPostalCode(
                                            props.postalCode,
                                        )
                                    }
                                >
                                    <FormLabel>Postal Code</FormLabel>
                                    <Input
                                        placeholder="V6Z 2E6"
                                        onChange={(e) =>
                                            props.setPostalCode(e.target.value)
                                        }
                                        value={props.postalCode}
                                    />
                                    <FormErrorMessage>
                                        {props.postalCode
                                            ? "Invalid Postal Code"
                                            : "Required"}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <FormControl id="school">
                                <FormLabel>School (if applicable)</FormLabel>
                                <Input
                                    placeholder="Westmount Secondary School"
                                    onChange={(e) =>
                                        props.setSchool(e.target.value)
                                    }
                                    value={props.school}
                                />
                            </FormControl>
                            <FormControl id="grade">
                                <FormLabel>Grade (if applicable)</FormLabel>
                                <Input
                                    placeholder="5"
                                    onChange={(e) =>
                                        props.setGrade(e.target.value)
                                    }
                                    value={props.grade}
                                />
                            </FormControl>
                            <div>
                                <Button
                                    id="Submit"
                                    bg={colourTheme.colors.Blue}
                                    color={"white"}
                                    fontWeight="400"
                                    my={8}
                                    px={12}
                                    borderRadius={100}
                                    mt={4}
                                    disabled={
                                        !testCanadianPostalCode(
                                            props.postalCode,
                                        )
                                    }
                                    onClick={props.formButtonOnClick}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
