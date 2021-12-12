import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdfjs, Document, Page } from "react-pdf";
import { Box } from "@chakra-ui/react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type GenerateCriminalCheckProps = {
    date?: Date;
    volunteerName?: string;
};

const MyDoc = () => (
    <Document>
        <Page>// My document data</Page>
    </Document>
);

export default function GenerateCriminalCheck() {
    return (
        <PDFDownloadLink document={<MyDoc />} fileName="test.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
    );
}

// export const GenerateCriminalCheck: React.FC<GenerateCriminalCheckProps> = ({
//     date,
//     volunteerName,
// }) => {
//     const [instance, updateInstance] = usePDF({ document: MyDoc });

//     if (instance.loading) return <div>Loading ...</div>;

//     if (instance.error) return <div>Something went wrong: </div>;

//     return (
//         <a href={instance.url} download="test.pdf">
//             Download
//         </a>
//     );
// };
