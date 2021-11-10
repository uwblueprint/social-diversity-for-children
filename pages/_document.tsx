import NextDocument, {
    DocumentContext,
    DocumentInitialProps,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";
import theme from "@definitions/chakra/theme";
import { ColorModeScript } from "@chakra-ui/color-mode";

class CustomDocument extends NextDocument {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const initialProps = await NextDocument.getInitialProps(ctx);

        return initialProps;
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head />
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
