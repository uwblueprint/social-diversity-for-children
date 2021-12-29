import seedDev from "./dev-seeds/index";
import prisma from "../services/database";

/**
 * Main method
 */
const main = async () => {
    if (process.env.NODE_ENV === "production") {
        console.log("No production seed...");
    } else {
        console.log("Running development seed...");
        await seedDev();
    }
    console.log("Seeding finished");
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
