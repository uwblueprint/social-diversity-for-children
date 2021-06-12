import { useRouter } from "next/router";
import session from "./api/checkout/session";

export default function Result() {
    const router = useRouter();
    const { session_id } = router.query;

    return (
        <div>
            <h1>Payment Success</h1>
            <pre>{session_id}</pre>
        </div>
    );
}
