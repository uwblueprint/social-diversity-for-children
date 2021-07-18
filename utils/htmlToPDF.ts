import { create, CreateOptions } from "html-pdf";

/**
 * converts hard coded html into a PDF and downloads the PDF locally
 * @param {string} htmlString
 * @param {string} downloadPath download path of the generated pdf
 * @param {string} volunteerName volunteer name
 * @param {string} date date that the form will be filled out on, can we just pass in current date?
 * @param {string} coordinatorName program coordinator name
 * TODO: incorporate parameters into pdf after form html is provided
 */
const htmlToPDF = (
    htmlString: string,
    downloadPath: string,
    volunteerName: string,
    date: Date,
    coordinatorName: string,
): void => {
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
