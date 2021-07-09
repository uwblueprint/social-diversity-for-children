import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: "Roboto",
    },
    colors: {
        brand: {
            100: "#000000",
            200: "#FFFFFF",
            300: "#6C6C6C",
        },
    },
});

export default theme;
