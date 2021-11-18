import { roles } from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        id: number;
        role: roles;
    }
}
