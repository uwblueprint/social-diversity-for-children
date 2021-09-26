import { useRef } from "react";
import { Button, Center, FormControl, Input } from "@chakra-ui/react";
type FileUploadButtonProps = {
    children?: React.ReactNode;
    setFiles: (files: File[]) => void;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    children,
    setFiles,
}): JSX.Element => {
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        fileInput.current.click();
    };

    const onFileInput = (e: React.FormEvent<HTMLInputElement>) => {
        console.log("on input");
        const target = e.target as HTMLInputElement;
        const files: File[] = [...Array.from(target.files as FileList)];
        setFiles(files);
    };
    return (
        <FormControl>
            <Center>
                <Button
                    backgroundColor="#0C53A0"
                    borderColor="brand.400"
                    width="366px"
                    height="54px"
                    fontSize="16px"
                    fontWeight="400"
                    color="white"
                    border="1px"
                    mt="20px"
                    onClick={handleClick}
                >
                    {children}
                </Button>
                <Input
                    ref={fileInput}
                    onInput={onFileInput}
                    type="file"
                    hidden
                    multiple
                />
            </Center>
        </FormControl>
    );
};

export default FileUploadButton;
