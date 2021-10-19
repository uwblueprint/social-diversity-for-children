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
import { IncomePage } from "@components/parent-form/IncomePage";
import { roles } from "@models/User";

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

    const saveParticipant = (participant) => {
        //Update the me object with the new partipcant data.
        //Particpant to update can be found by sideBarPage
        //(If there are 3 children SideBarPage 0-2 represents the index in the student array)
    };
    const saveGuardian = (parent) => {
        const parentData = me.parent;

        parentData.phoneNumber = parent.phoneNumber;
        const userData = {
            firstName: parent.firstName,
            lastName: parent.lastName,
            role: roles.PARENT,
            roleData: parentData,
        };
        updateUser(userData);
    };
    const saveVolunteer = (volunteer) => {
        //Update the me object and save
    };

    async function updateUser(userData) {
        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };
        const response = await fetch("/api/user", request);
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    const PROOF_OF_INCOME_EXAMPLES = ["Income tax notice", "Paystub", "etc"];

    const UPLOADING_PROOF_OF_INCOME = [
        `Navigate to My Account > Proof of Income`,
        `Upload a copy of the result to your SDC account`,
        `Once you’ve submitted your proof of income, keep an eye out for approval status from SDC!`,
        `Upon approval, discounts will automatically applied to your account!
    Check your account for details on the amount of discount you have been approved for`,
    ];

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
                            me: me,
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
                component: (
                    <IncomePage
                        UPLOADING_PROOF_OF_INCOME={UPLOADING_PROOF_OF_INCOME}
                        PROOF_OF_INCOME_EXAMPLES={PROOF_OF_INCOME_EXAMPLES}
                    />
                ),
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
                            me: me,
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
            <Box style={{ display: "flex", marginBottom: 50 }}>
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
                                style={{ marginLeft: 200 }}
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
