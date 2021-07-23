import { useSession, signIn, signOut } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";

export default function Component() {
    const [session, loading] = useSession();
    if (session) {
        return (
            <Wrapper>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            Not signed in <br />
        </Wrapper>
    );
}
