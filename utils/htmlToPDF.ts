import { create, CreateOptions } from "html-pdf";
import { readFileSync } from "fs";

/**
 * converts hard coded html into a PDF and downloads the PDF locally
 */
const htmlToPDF = (downloadPath: string): void => {
    // path of the hard coded html or the html as a string
    const htmlPath = "./test.html";
    const htmlString = readFileSync(htmlPath, "utf8");
    const options: CreateOptions = {
        directory: downloadPath,
        format: "Letter",
    };

    create(htmlString, options).toFile("./test.pdf", function (err) {
        if (err) return console.log(err);
        console.log("PDF downloaded");
    });
};

export { htmlToPDF };
