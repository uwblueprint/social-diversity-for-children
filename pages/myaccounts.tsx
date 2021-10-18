import Wrapper from "@components/SDCWrapper";
import { useEffect, useState } from "react";
import {
    MdPersonOutline,
    MdAccountCircle,
    MdArticle,
    MdLogout,
} from "react-icons/md";
import { Box } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import useMe from "@utils/useMe";
import { ParticipantInfo } from "@components/myAccounts/ParticipantInformation";
import { VolunteerInfo } from "@components/myAccounts/PersonalVolunteer";
import { GuardianInfo } from "@components/myAccounts/GuardianInformation";

/**
 * This is the page that a user will use to edit their account information
 */
export default function MyAccount(): JSX.Element {
    // Redirect user if user already signed up
    const { me, isLoading } = useMe();

    console.log(me);

    const [sideBarPage, setSideBarPage] = useState(0);
    const [editing, setEditing] = useState(false);

    const [sideBar, setSideBar] = useState([]);

    const saveParticipant = (participant) => {};
    const saveGuardian = (participant) => {};
    const saveVolunteer = (volunteer) => {};

    //The page will be rendered differently based on if the user is a parent or volunteer

    console.log(editing);

    useEffect(() => {
        if (!me || isLoading) {
            return;
        }
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
                    component: (
                        <ParticipantInfo
                            props={{
                                student: student,
                                save: saveParticipant,
                                edit: editing,
                            }}
                        />
                    ),
                };
                SideBar.push(option);
            });
            SideBar.push({
                name: "",
                icon: <MdPersonOutline size={35} />,
                title: "Guardian Information",
                header: "Guardian Information",
                component: (
                    <GuardianInfo
                        props={{
                            me: me.parent,
                            save: saveGuardian,
                            edit: editing,
                        }}
                    />
                ),
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
                header: "Personal Information",
                component: (
                    <VolunteerInfo
                        props={{
                            me: me.volunteer,
                            save: saveGuardian,
                            edit: editing,
                        }}
                    />
                ),
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
        setSideBar(SideBar);
    }, [me, editing]);

    //Wait for the user to load
    if (isLoading) {
        return <Loading />;
    }

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
                    {sideBar.map((option, i) => (
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
                                {sideBar[sideBarPage]?.header}
                            </text>
                            <a
                                onClick={() => setEditing(!editing)}
                                style={{ marginLeft: 183 }}
                            >
                                {" "}
                                {editing ? "Cancel" : "Edit"}
                            </a>
                        </Box>
                        {sideBar[sideBarPage]?.component}
                    </Box>
                </Box>
            </Box>
        </Wrapper>
    );
}
