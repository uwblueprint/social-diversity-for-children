import { addDecorator } from "@storybook/react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
};

export const globalTypes = {
    direction: {
        name: "Direction",
        description: "Direction for layout",
        defaultValue: "LTR",
        toolbar: {
            icon: "globe",
            items: ["LTR", "RTL"],
        },
    },
};

const withChakra = (StoryFn, context) => {
    const { direction } = context.globals;
    const dir = direction.toLowerCase();
    return (
        <ChakraProvider theme={extendTheme({ direction: dir })}>
            <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
                <StoryFn />
            </div>
        </ChakraProvider>
    );
};

addDecorator(withChakra);
