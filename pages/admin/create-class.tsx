import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Image, Button, Input } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
// import { ResponseUtil } from "@utils/responseUtil";
import { getPresignedPostForUpload } from "@aws/s3";
import { weekday } from ".prisma/client";
import Stripe from "stripe";

export default function CreateClass(): JSX.Element {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});
    const EDIT = true;

    const [image, setImage] = useLocalStorage("classImage", "");

    const [className, setClassName] = useLocalStorage("className", "");
    const [associatedProgram, setAssociatedProgram] = useLocalStorage("associatedProgram", "");

    const [teacherName, setTeacherName] = useLocalStorage("teacherName", "");
    const [dateAvailable, setDateAvailable] = useLocalStorage("dateAvailable", "");

    const [location, setLocation] = useLocalStorage("location", "");
    const [locationDescription, setLocationDescription] = useLocalStorage(
        "locationDescription",
        "",
    );

    const [recurrence, setRecurrence] = useLocalStorage("recurrence", "");
    const [repeatOn, setRepeatOn] = useLocalStorage("repeatOn", "");
    const [endRecurrence, setEndRecurrence] = useLocalStorage("endReuccrence", "");

    const [age, setAge] = useLocalStorage("age", "");
    const [aboveUnder, setAboveUnder] = useLocalStorage("aboveUnder", "");
    const [maxCapacity, setMaxCapacity] = useLocalStorage("maxCapacity", "");
    const [price, setPrice] = useLocalStorage("price", "");

    const [classDescription, setClassDescription] = useLocalStorage("classDescription", "");

    const [stripeLink, setStripeLink] = useState("");

    const upload = (value) => {
        console.log(value.target.files); //returns FILELIST array (will only be the first element)
        console.log(process.env.S3_PUBLIC_IMAGES_BUCKET);
        const post = getPresignedPostForUpload("sdc-public-images", "Test/image.jng");

        //setImage(awsurl)
    };

    async function save() {
        //Create Stripe product and price
        const product = await stripe.products.create({
            name: className,
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: parseInt(price),
            currency: "usd",
            recurring: { interval: "month" }, //recurrance?
            product: product.id,
        });

        const data = {
            name: className,
            programId: associatedProgram,

            startDate: null,
            endRecurrence: endRecurrence,

            weekday: repeatOn,

            borderAge: age,
            isAgeMinimal: aboveUnder === "under", //Assuming that minimal means "at least"

            stripePriceId: stripePrice.id,
        };
        //Save to database
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api/program", request);
        //TODO: handle error?
    }

    return (
        <Wrapper>
            <Heading
                alignSelf="flex-start"
                fontWeight={700}
                fontSize={22}
                style={{ color: colourTheme.colors.Blue, margin: 25 }}
            >
                Create
            </Heading>
            <Box
                style={{
                    borderBottom: "2px solid lightgray",
                    width: "100%",
                    marginBottom: 50,
                }}
            ></Box>
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
                    <p>Cover Photo</p>
                    <Image
                        boxSize="200px" //TODO: Figure out how to set width/length seperately
                        htmlHeight="700px"
                        objectFit="cover"
                        src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                        alt="Segun Adebayo"
                    />
                    <Input
                        id="upload"
                        type="file"
                        onChange={upload}
                        hidden
                        disabled={!EDIT}
                    ></Input>
                    <label
                        for="upload"
                        style={{
                            cursor: "pointer",
                            backgroundColor: "#E2E8F0",
                            borderRadius: 6,
                            padding: 5,
                            marginTop: 15,
                            width: 200,
                            textAlign: "center",
                        }}
                    >
                        Upload
                    </label>
                </VStack>
                <Box>
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
                            type="programList"
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
                            name={"DateSignup"}
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
                        name="Recurrence"
                        options={["weekly", "bi-weekly", "monthly"]}
                        value={recurrence}
                        setValue={setRecurrence}
                        edit={EDIT}
                    ></SelectField>
                    <SelectField
                        name="Repeat On"
                        options={["Su", "M", "Tu", "W", "Th", "F", "Sa"]}
                        value={repeatOn}
                        setValue={setRepeatOn}
                        edit={EDIT}
                    ></SelectField>
                    <DateField
                        name={"End Recurrence On"}
                        value={endRecurrence}
                        setValue={setEndRecurrence}
                        edit={EDIT}
                    />
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
                        name={"Price ($)"}
                        value={price}
                        setValue={setPrice}
                        placeholder={"5"}
                        edit={EDIT}
                    ></TextField>
                </HStack>
                <br></br>
                <br></br>
                <TextField
                    name={"Class Description"}
                    value={classDescription}
                    setValue={setClassDescription}
                    longAnswer={true}
                    edit={EDIT}
                    placeholder={"Type Here"}
                ></TextField>
                {EDIT ? (
                    <Button
                        id="Submit"
                        bg={colourTheme.colors.Blue}
                        color={"white"}
                        fontWeight="400"
                        my={8}
                        px={12}
                        borderRadius={6}
                        mt={8}
                        disabled={false}
                        onClick={save}
                    >
                        {"Create Class"}
                    </Button>
                ) : null}
            </Box>
        </Wrapper>
    );
}
