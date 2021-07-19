import { useSession, signIn, signOut } from "next-auth/client";
import { Navbar } from "@components/Navbar";

export default function Component() {
    const [session, loading] = useSession();
    if (session) {
        return (
            <>
                <Navbar session={session} />
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            <Navbar />
            Not signed in <br />
        </>
    );
}
