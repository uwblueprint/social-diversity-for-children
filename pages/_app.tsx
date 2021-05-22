import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from "@i18n";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ChakraProvider>
    );
}

export default appWithTranslation(MyApp);
