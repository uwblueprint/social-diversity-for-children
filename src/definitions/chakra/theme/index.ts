import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Poppins",
        body: "Poppins",
    },
    colors: {
        brand: {
            100: "#000000",
            200: "#FFFFFF",
            300: "#6C6C6C",
            400: "#8D8D8D",
            500: "#ECECEC",
        },
    },
});

export default theme;
