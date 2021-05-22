import React, { ReactElement } from "react";
import {
    render as baseRender,
    RenderOptions,
    RenderResult,
} from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import { Provider } from "react-redux";
import store from "@redux/store";

/**
 * Custom renderer example with @testing-library/react
 * You can customize it to your needs.
 *
 * To learn more about customizing renderer,
 * please visit https://testing-library.com/docs/react-testing-library/setup
 */

export const AllTheProviders = ({ children }) => {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Provider store={store}>{children}</Provider>
            </ChakraProvider>
        </>
    );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
    baseRender(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
