import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
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
