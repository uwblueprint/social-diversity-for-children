import seedDev from "./dev-seeds/index";
import seedProd from "./prod-seeds/index";
import prisma from "../services/database";

/**
 * Main method
 */
const main = async () => {
    if (process.env.NODE_ENV === "production") {
        await seedProd();
    } else {
        await seedDev();
    }
};

// Execute main to start seeding
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
