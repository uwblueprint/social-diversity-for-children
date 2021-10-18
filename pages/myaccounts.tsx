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
    VStack,
    Select,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import colourTheme from "@styles/colours";
import { testCanadianPostalCode } from "@utils/validation/fields";
import { province } from "@models/User";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";
import validator from "validator";
import useMe from "@utils/useMe";
import { ParticipantInfo } from "@components/myAccounts/ParticipantInformation";
import { VolunteerInfo } from "@components/myAccounts/ParticipantInformation";
import { GuardianInfo } from "@components/myAccounts/GuardianInformation";

/**
 * This is the page that a user will use to edit their account information
 */
export default function MyAccount(): JSX.Element {
    // Redirect user if user already signed up
    const { me, isLoading } = useMe();

    if (isLoading) {
        return <Loading />;
    }

    console.log(me);

    const [sideBarPage, setSideBarPage] = useState(0);

    //The page will be rendered differently based on if the user is a parent or volunteer

    //Generate the side bar
    const SideBar = [];
    if (me.role === "PARENT") {
        me.parent.students.forEach((student) => {
            const option = {
                name: student.firstName + " " + student.lastName,
                icon: <MdAccountCircle size={35} />,
                type: "PARTICIPANT",
                title: "Personal Information",
                header: "General Information",
            };
            SideBar.push(option);
        });
        SideBar.push({
            name: "",
            icon: <MdPersonOutline size={35} />,
            title: "Guardian Information",
            header: "Guardian Information",
        });
        SideBar.push({
            name: "",
            icon: <MdArticle size={35} />,
            title: "Proof of Income",
            header: "Proof of Income",
        });
        SideBar.push({
            name: "",
            icon: <MdLogout size={35} />,
            title: "log out",
        });
    } else {
        SideBar.push({
            name: "",
            icon: <MdPersonOutline size={35} />,
            title: "Participant Information",
            header: "Participant Information",
        });
        SideBar.push({
            name: "",
            icon: <MdArticle size={35} />,
            title: "Criminal Record Check",
            header: "Criminal Record Check",
        });
        SideBar.push({
            name: "",
            icon: <MdLogout size={35} />,
            onChange: null,
            title: "log out",
        });
        //volunteer
    }

    const props = {};
    const router = useRouter();

    const [editing, setEditing] = useState(false);

    const save = () => {};

    console.log(sideBarPage);

    return (
        <Wrapper>
            <Box style={{ display: "flex" }}>
                <Box style={{ width: 312, marginBottom: 50 }}>
                    <text
                        style={{
                            fontWeight: 700,
                            fontSize: 36,
                            marginBottom: 44,
                        }}
                    >
                        {"My Account"}
                    </text>
                    {SideBar.map((option, i) => (
                        <Box
                            key={i}
                            onClick={() => setSideBarPage(i)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 32,
                            }}
                        >
                            <br></br>
                            {option.icon}
                            <Box style={{ marginLeft: 27 }}>
                                <p>{option.title}</p>
                                <p>
                                    {option.name ? "(" + option.name + ")" : ""}
                                </p>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box>
                    <Box
                        style={{
                            border: "1px solid",
                            width: 600,
                            marginTop: 87,
                            padding: 48,
                        }}
                    >
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            {" "}
                            <text style={{ fontWeight: 700, fontSize: 24 }}>
                                {SideBar[sideBarPage].header}
                            </text>
                            <a
                                onClick={() => setEditing(!editing)}
                                style={{ marginLeft: 183 }}
                            >
                                {" "}
                                Edit
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Wrapper>
    );
}
