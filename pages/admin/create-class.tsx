import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import { UploadField } from "@components/formFields/UploadField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { AdminHeader } from "@components/admin/AdminHeader";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Stripe from "stripe";
import { Session } from "next-auth";
import { locale } from ".prisma/client";
import { MultipleTextField } from "@components/formFields/MuitipleTextField";
import { infoToastOptions } from "@utils/toast/options";
import { useRouter } from "next/router";
import { AdminModal } from "@components/admin/AdminModal";

type Props = {
    session: Session;
};

export default function CreateClass({ session }: Props): JSX.Element {
    const toast = useToast();
    const router = useRouter();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});
    const EDIT = true;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const sortedLocale = Object.keys(locale).sort();

    const [image, setImage] = useLocalStorage(
        "programImage",
        "https://www.digitalcitizen.life/wp-content/uploads/2020/10/photo_gallery.jpg",
    );

    const [className, setClassName] = useLocalStorage("className", "");
    const [associatedProgram, setAssociatedProgram] = useLocalStorage("associatedProgram", "");

    const [teacherName, setTeacherName] = useLocalStorage("teacherName", "");
    const [dateAvailable, setDateAvailable] = useLocalStorage("dateAvailable", "");

    const [location, setLocation] = useLocalStorage("location", "");
    const [locationDescription, setLocationDescription] = useLocalStorage(
        "locationDescription",
        "",
    );

    const [isArchived, setIsArchived] = useLocalStorage("isArchived", false);

    const [recurrence, setRecurrence] = useLocalStorage("recurrence", "");
    const [repeatOn, setRepeatOn] = useLocalStorage("repeatOn", "");
    const [endRecurrence, setEndRecurrence] = useLocalStorage("endReuccrence", "");

    const [age, setAge] = useLocalStorage("age", "");
    const [aboveUnder, setAboveUnder] = useLocalStorage("aboveUnder", "");
    const [maxCapacity, setMaxCapacity] = useLocalStorage("maxCapacity", "");
    const [volunteerCapacity, setVolunteerCapacity] = useLocalStorage("volunteerCapacity", "");
    const [price, setPrice] = useLocalStorage("price", "");

    const [classDescription, setClassDescription] = useLocalStorage(
        "classDescription",
        Array(sortedLocale.length).join(".").split("."),
    );

    const [stripeLink, setStripeLink] = useState("");

    async function save() {
        //Create Stripe product and price
        const product = await stripe.products.create({
            name: className,
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: parseInt(price),
            currency: "usd",
            product: product.id,
        });

        console.log(product);
        console.log(stripePrice);

        const classData = {
            onlineFormat: "online",
            programId: associatedProgram,
            imageink: image,
            program: associatedProgram,
            isAgeMinimal: aboveUnder === "Under",
            spaceTotal: maxCapacity,
            stripePriceId: null,
            borderAge: age,
            weekday: repeatOn,
            name: className,
            startDate: null,
            endDate: null,
            //location,
            //locationDescription,
            //availableDate: dateAvailable,
            //teacherName,
            //recurrence,
            //endRecurrence,

            //filling in
            startTimeMinutes: 0,
            durationMinutes: 0,
        };

        //Create an array of translation objects from the name and description
        const translationData = [];
        classDescription.forEach((description, index) => {
            if (description.length !== 0) {
                translationData.push({
                    name: className,
                    description,
                    language: sortedLocale[index],
                });
            }
        });

        const data = {
            classInput: classData,
            classTranslationInput: translationData,
        };
        //Save to database
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api/class", request);
        //TODO: handle error?
    }

    return (
        <Wrapper session={session}>
            <AdminHeader>Create</AdminHeader>
            <HStack spacing={8} alignSelf="start" style={{ margin: 25, marginLeft: 50 }}>
                <a href="/admin/create-program">Program</a>
                <a
                    href="/admin/create-class"
                    style={{ color: colourTheme.colors.Blue, borderBottom: "3px solid" }}
                >
                    Class
                </a>
            </HStack>
            <br></br>
            <HStack spacing={4} alignSelf="start">
                <VStack spacing={2} mx={8}>
                    <UploadField name="Cover Photo" value={image} setValue={setImage}></UploadField>
                </VStack>
                <Box w="100%" style={{ marginLeft: 25, marginRight: 25 }}>
                    <HStack spacing={8} alignSelf="start">
                        <TextField
                            name={"Class Name"}
                            value={className}
                            setValue={setClassName}
                            placeholder={"Singing Monkeys"}
                            edit={EDIT}
                        ></TextField>
                        <SelectField
                            name="Associated Program"
                            options={["Program 1", "Program 2"]}
                            value={associatedProgram}
                            setValue={setAssociatedProgram}
                            edit={EDIT}
                        ></SelectField>
                    </HStack>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <TextField
                            name={"Teacher Name"}
                            value={teacherName}
                            setValue={setTeacherName}
                            placeholder={"Brian"}
                            edit={EDIT}
                        ></TextField>
                        <DateField
                            name={"Start Date"}
                            value={dateAvailable}
                            setValue={setDateAvailable}
                            edit={EDIT}
                        />
                    </HStack>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <SelectField
                            name="Location"
                            options={["Online", "In-Person"]}
                            value={location}
                            setValue={setLocation}
                            edit={EDIT}
                        ></SelectField>
                        <TextField
                            name={""}
                            value={locationDescription}
                            setValue={setLocationDescription}
                            placeholder={"Description"}
                            edit={EDIT}
                        ></TextField>
                    </HStack>
                    <br></br>
                </Box>
            </HStack>
            <br></br>
            <Box style={{ marginLeft: 25, marginRight: 25 }}>
                <HStack spacing={8} alignSelf="start">
                    <SelectField
                        name="Repeat On"
                        options={["Su", "M", "Tu", "W", "Th", "F", "Sa"]}
                        value={repeatOn}
                        setValue={setRepeatOn}
                        edit={EDIT}
                    ></SelectField>
                    <DateField
                        name={"End Date"}
                        value={endRecurrence}
                        setValue={setEndRecurrence}
                        edit={EDIT}
                    />
                    <TextField
                        name={"Price ($)"}
                        value={price}
                        setValue={setPrice}
                        placeholder={"5"}
                        edit={EDIT}
                    ></TextField>
                </HStack>
                <br></br>
                <br></br>
                <HStack spacing={8} alignSelf="start">
                    <TextField
                        name={"Age Requirement (years)"}
                        value={age}
                        setValue={setAge}
                        placeholder={"5"}
                        edit={EDIT}
                    ></TextField>
                    <SelectField
                        name="and"
                        options={["Above", "Under"]}
                        value={aboveUnder}
                        setValue={setAboveUnder}
                        edit={EDIT}
                    ></SelectField>
                    <TextField
                        name={"Max Capacity"}
                        value={maxCapacity}
                        setValue={setMaxCapacity}
                        placeholder={"5"}
                        edit={EDIT}
                    ></TextField>
                    <TextField
                        name={"Volunteer Capacity"}
                        value={volunteerCapacity}
                        setValue={setVolunteerCapacity}
                        placeholder={"5"}
                        edit={EDIT}
                    ></TextField>
                </HStack>
                <br></br>
                <br></br>
                <MultipleTextField
                    name={"Class Description"}
                    value={classDescription}
                    setValue={setClassDescription}
                    longAnswer={true}
                    edit={EDIT}
                    placeholder={"Type Here"}
                ></MultipleTextField>
                <CheckBoxField
                    name="Archived "
                    value={isArchived}
                    setValue={setIsArchived}
                    required={false}
                    edit={EDIT}
                ></CheckBoxField>
                {EDIT ? (
                    <Button
                        key={className + location} //When loading from localstorage finishes this causes the button to re-render
                        id="Submit"
                        bg={colourTheme.colors.Blue}
                        color={"white"}
                        fontWeight="400"
                        my={8}
                        px={12}
                        borderRadius={6}
                        mt={8}
                        disabled={
                            !className ||
                            !associatedProgram ||
                            !teacherName ||
                            !dateAvailable ||
                            !location ||
                            !locationDescription ||
                            !recurrence ||
                            !repeatOn ||
                            !endRecurrence ||
                            !age ||
                            !aboveUnder ||
                            !maxCapacity ||
                            !price ||
                            !classDescription
                        }
                        onClick={save}
                    >
                        {"Create Class"}
                    </Button>
                ) : null}
            </Box>
            <AdminModal
                isOpen={saveModalOpen}
                onClose={() => setSaveModalOpen(false)}
                onProceed={save}
                header={`Are you sure you want to create a new class?`}
                body="You can always edit the program you have created in the Classes page."
            />
        </Wrapper>
    );
}
