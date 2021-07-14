import { create, CreateOptions } from "html-pdf";
import { readFileSync } from "fs";

/**
 * converts hard coded html into a PDF and downloads the PDF locally
 * @param {string} downloadPath download path of the generated pdf
 * @param {string} volunteerName volunteer name
 * @param {string} date date that the form will be filled out on, can we just pass in current date?
 * @param {string} coordinatorName program coordinator name
 * parameters to be utilised after form html is provided
 */
const htmlToPDF = (
    downloadPath: string,
    volunteerName: string,
    date: Date,
    coordinatorName,
): void => {
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
