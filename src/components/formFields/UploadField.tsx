import React, { useState } from "react";
import {
    FormLabel,
    FormControl,
    Image,
    Input,
    FormErrorMessage,
    AspectRatio,
    Spinner,
} from "@chakra-ui/react";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
    isLarge?: boolean;
};

export const UploadField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
    isLarge = false,
    ...props
}): JSX.Element => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const upload = async (value) => {
        setIsUploading(true);
        const file = value.target.files[0];

        const type = "cover-photo";

        try {
            //If the file type is invalid return an error
            if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                throw "Invalid file type";
            }
            const res = await fetch(`/api/file/upload?path=${type}&file=${file.name}`);
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
                setValue(url + "/" + fields.key);
            } else {
                throw "Upload Failed";
            }
        } catch (e) {
            console.log(e);
            setError(e);
        }
        setIsUploading(false);
    };

    return (
        <FormControl
            isRequired={required && edit}
            isInvalid={(!value && required && edit) || error.length > 0}
            {...props}
        >
            <FormLabel>{name}</FormLabel>
            <AspectRatio ratio={isLarge ? 2 : 1} width={isLarge ? "350px" : "200px"}>
                <Image src={value} alt="Segun Adebayo" />
            </AspectRatio>
            <br></br>
            <Input id="upload" type="file" onChange={upload} hidden disabled={!edit}></Input>
            <label
                htmlFor="upload"
                style={{
                    cursor: "pointer",
                    backgroundColor: "#E2E8F0",
                    borderRadius: 6,
                    padding: 5,
                    paddingLeft: isLarge ? 146 : 71,
                    paddingRight: isLarge ? 146 : 71,
                    marginTop: 10,
                    width: isLarge ? 350 : 200,
                    textAlign: "center",
                }}
            >
                Upload
                {isUploading ? <Spinner style={{ marginLeft: 10 }} size="sm"></Spinner> : null}
            </label>

            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
