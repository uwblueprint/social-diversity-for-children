import React, { useState } from "react";
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
    const [isUploading, setIsUploading] = useState(false);

    const upload = async (value) => {
        console.log(value.target.files); //returns FILELIST array (will only be the first element)
        console.log(process.env.S3_PUBLIC_IMAGES_BUCKET);
        setIsUploading(true);
        const file = value.target.files[0];

        try {
            // TODO don't prefix file name, instead put random file name into database eventually
            // TODO randomize filename
            const res = await fetch(
                `/api/file/upload?file=${file.name}&bucket=${process.env.S3_PUBLIC_IMAGES_BUCKET}`,
            );
            const data = await res.json();
            const { url, fields } = data.data;
            const formData = new FormData();

            Object.entries({ ...fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
            });
            const fileUpload = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (fileUpload.ok) {
                console.log("Uploaded successfully!");
                //setUploadSuccess(true);
            } else {
                // TODO
                console.error("Upload failed.");
                //setUploadSuccess(false);
            }
        } catch (e) {
            console.log(e);
        }

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
