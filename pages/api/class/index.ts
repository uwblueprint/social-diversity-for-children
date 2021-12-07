import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClasses, createClass } from "@database/class";
import { ClassInput, ClassTranslationInput } from "@models/Class";
import { validateClassData } from "@utils/validation/class";
import { getClassInfoWithProgramId } from "@database/program-card-info";
import { stripe } from "services/stripe";

/**
 * handle controls the request made to the class resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET": {
            const { id: programId, archived } = req.query;

            if (!programId) {
                const classes = await getClasses(
                    Boolean(JSON.parse((archived as string) || "false")),
                );
                ResponseUtil.returnOK(res, classes);
            } else {
                const programIdNumber = parseInt(programId as string, 10);
                if (isNaN(programIdNumber)) {
                    return ResponseUtil.returnBadRequest(
                        res,
                        "programId should be passed in as numbers",
                    );
                }
                const classes = await getClassInfoWithProgramId(
                    programId as string,
                    Boolean(JSON.parse((archived as string) || "false")),
                );
                ResponseUtil.returnOK(res, classes);
            }
            break;
        }
        case "POST": {
            const classInput = req.body.classInput as ClassInput;
            const classTranslationInput = req.body.classTranslationInput as ClassTranslationInput[];

            const validationErrors = validateClassData(classInput);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const productPrice = classInput.price; //Used for stripe
                delete classInput.price; //Don't need this field to save to db
                //Create Stripe Key

                //If the price doesn't exist create a product and the associated price
                if (!classInput.stripePriceId) {
                    const product = await stripe.products.create({
                        name: classInput.name,
                    });
                    const stripePrice = await stripe.prices.create({
                        unit_amount: parseInt(productPrice),
                        currency: "usd",
                        product: product.id,
                    });

                    classInput.stripePriceId = stripePrice.id;
                }
                //Else if it exists, check if the price needs to be updated
                else {
                    const price = await stripe.prices.retrieve(classInput.stripePriceId);
                    if (price.unit_amount !== parseInt(productPrice)) {
                        //Create a new price
                        const stripePrice = await stripe.prices.create({
                            unit_amount: parseInt(productPrice),
                            currency: "usd",
                            product: price.product as string,
                        });
                        classInput.stripePriceId = stripePrice.id;
                    }
                }
                const newClass = await createClass(classInput, classTranslationInput);
                if (!newClass) {
                    ResponseUtil.returnBadRequest(res, `Class could not be created`);
                    break;
                }
                ResponseUtil.returnOK(res, newClass);
            }
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
