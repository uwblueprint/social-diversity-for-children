import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClasses, createClass } from "@database/class";
import { ClassInput, ClassTranslationInput } from "@models/Class";
import { validateClassData } from "@utils/validation/class";
import { getClassInfoWithProgramId } from "@database/program-card-info";
import { stripe } from "services/stripe";
import { getSession } from "next-auth/client";
import { isAdmin } from "@utils/session/authorization";

/**
 * handle controls the request made to the class resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });
    switch (req.method) {
        case "GET": {
            const { id: programId, archived } = req.query;

            const archivedParsed = Boolean(JSON.parse((archived as string) || "false"));

            // if archived is true, then we need user to be admin for access
            if (archivedParsed && !isAdmin(session)) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }

            if (!programId) {
                const classes = await getClasses(archivedParsed);
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
                    archivedParsed,
                );
                ResponseUtil.returnOK(res, classes);
            }
            break;
        }
        case "POST": {
            if (!isAdmin(session)) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }

            const { teacherRegs, ...input } = req.body.classInput;
            const classInput = input as ClassInput;
            const classTranslationInput = req.body.classTranslationInput as ClassTranslationInput[];

            const validationErrors = validateClassData(classInput);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const productPriceInCents = parseInt(classInput.price) * 100; //Used for stripe
                delete classInput.price; //Don't need this field to save to db
                //Create Stripe Key

                //If the price doesn't exist create a product and the associated price
                if (!classInput.stripePriceId) {
                    const product = await stripe.products.create({
                        name: classInput.name,
                    });
                    const stripePrice = await stripe.prices.create({
                        unit_amount: productPriceInCents,
                        currency: "cad",
                        product: product.id,
                    });

                    classInput.stripePriceId = stripePrice.id;
                }
                //Else if it exists, check if the price needs to be updated
                else {
                    const price = await stripe.prices.retrieve(classInput.stripePriceId);
                    if (price.unit_amount !== productPriceInCents) {
                        //Create a new price
                        const stripePrice = await stripe.prices.create({
                            unit_amount: productPriceInCents,
                            currency: "cad",
                            product: price.product as string,
                        });
                        classInput.stripePriceId = stripePrice.id;
                    }
                }
                const newClass = await createClass(classInput, classTranslationInput, teacherRegs);
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
