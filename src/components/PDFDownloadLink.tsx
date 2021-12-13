import {
    PDFDownloadLink,
    View,
    Text,
    StyleSheet,
    Document,
    Page,
    Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    view: {
        minWidth: "100%",
        minHeight: "100%",
        height: "100%",
        width: "100%",
    },
    pageBackground: {
        position: "absolute",
        minWidth: "100%",
        minHeight: "100%",
        height: "100%",
        width: "100%",
    },
});

export const ProgramCard: React.FC = (): JSX.Element => {
    return (
        <PDFDownloadLink document={<MyDocument />} fileName="criminal-check.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
    );
};

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4">
            <View style={styles.pageBackground}>
                <Image
                    src="https://sdc-public-images.s3.us-east-1.amazonaws.com/criminal-check-blank.jpg"
                    style={styles.pageBackground}
                />
                <Text>
                    Date: [Sept 30th, 2021] To whom it may concern, This Criminal Record Check
                    applicant is a volunteer of Social Diversity for Children Foundation (SDC), a
                    registered Canadian charity that empowers youth to empower children with
                    disabilities. SDC was founded and is operated largely by young people and
                    recognizes the importance of teaching the younger generation about inclusivity,
                    acceptance, and compassion at an early age. The applicant, [Leon Jia Chen Yu],
                    will be a volunteer at the Drama for Diversity (DFD) Program. As SDC is a
                    registered Canadian charity, we are requesting that fees associated with the
                    Criminal Record Check (CRC) be waived for this applicant. Our charity number is
                    806518437 RR 0001. Please provide the CRC directly to the applicant or forward
                    it to PO Box 97073, Richmond, BC V6X 8H3. Thank you so much for your help, and
                    for joining us in our mission of empowering youth to empower children with
                    disabilities.
                </Text>
            </View>
        </Page>
    </Document>
);
