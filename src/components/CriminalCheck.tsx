import React from "react";
import {
    usePDF,
    PDFDownloadLink,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import { Box } from "@chakra-ui/react";

type GenerateCriminalCheckProps = {
    date?: Date;
    volunteerName?: string;
};

const MyDoc = (
    <Document>
        <Page>// My document data</Page>
    </Document>
);

export const GenerateCriminalCheck: React.FC<GenerateCriminalCheckProps> = ({
    date,
    volunteerName,
}) => {
    const [instance, updateInstance] = usePDF({ document: MyDoc });

    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong: </div>;

    return (
        <a href={instance.url} download="test.pdf">
            Download
        </a>
    );
};
