import { useRef } from "react";
import { Button, Center, FormControl, Input } from "@chakra-ui/react";
type FileUploadButtonProps = {
    children?: React.ReactNode;
    setFiles: (files: File[]) => void;
    changeBackground: boolean;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    children,
    setFiles,
    changeBackground,
}): JSX.Element => {
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        fileInput.current.click();
    };

    const onFileInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files: File[] = [...Array.from(target.files as FileList)];
        setFiles(files);
    };
    return (
        <FormControl>
            <Center>
                <Button
                    backgroundColor={changeBackground ? "#E2E8F0" : "#0C53A0"}
                    borderColor={changeBackground ? "#E2E8F0" : "brand.400"}
                    width="366px"
                    height="54px"
                    fontSize="16px"
                    fontWeight="400"
                    color={changeBackground ? "#2D3748" : "white"}
                    border="1px"
                    mt="20px"
                    onClick={handleClick}
                >
                    {children}
                </Button>
                <Input ref={fileInput} onInput={onFileInput} type="file" hidden />
            </Center>
        </FormControl>
    );
};

export default FileUploadButton;
