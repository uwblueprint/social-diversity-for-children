import dynamic from "next/dynamic";

const PDFLink = dynamic(
    () => import("@components/PDFDownloadLink").then((module) => module.ProgramCard),
    { ssr: false },
);

export default function Result(): JSX.Element {
    return <PDFLink />;
}
