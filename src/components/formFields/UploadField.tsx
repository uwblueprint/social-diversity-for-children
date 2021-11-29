import React from "react";
import { FormLabel, FormControl, Image, Input, FormErrorMessage } from "@chakra-ui/react";
import { getPresignedPostForUpload } from "@aws/s3";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
};

export const UploadField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
    ...props
}): JSX.Element => {
    const upload = (value) => {
        console.log(value.target.files); //returns FILELIST array (will only be the first element)
        console.log(process.env.S3_PUBLIC_IMAGES_BUCKET);
        const post = getPresignedPostForUpload("sdc-public-images", "Test/image.jng");

        //setValue(fileUrl)
    };

    return (
        <FormControl
            isRequired={required && edit}
            isInvalid={!value && required && edit}
            {...props}
        >
            <FormLabel>{name}</FormLabel>
            <Image
                boxSize="200px" //TODO: Figure out how to set width/length seperately
                objectFit="cover"
                src={value}
                alt="Segun Adebayo"
            />
            <br></br>
            <Input id="upload" type="file" onChange={upload} hidden disabled={!edit}></Input>
            <label
                for="upload"
                style={{
                    cursor: "pointer",
                    backgroundColor: "#E2E8F0",
                    borderRadius: 6,
                    padding: 5,
                    paddingLeft: 71,
                    paddingRight: 71,
                    marginTop: 10,
                    width: 200,
                    textAlign: "center",
                }}
            >
                Upload
            </label>

            <FormErrorMessage>{"Required"}</FormErrorMessage>
        </FormControl>
    );
};
