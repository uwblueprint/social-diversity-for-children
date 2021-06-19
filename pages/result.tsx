import { useRouter } from "next/router";
import useSWR from "swr";

/**
 * This is the page that the user will land on after completing their
 * transaction on stripe
 */
export default function Result(): JSX.Element {
    // set up hook for using next router and obtaining parameter details
    const router = useRouter();

    // obtain session details once the session_id query parameter has been obtained
    const { data } = useSWR(
        router.query.session_id
            ? `/api/checkout/${router.query.session_id}`
            : null,
        (url) => fetch(url).then((res) => res.json()),
    );

    // neatly display the session information
    // TODO: Remove the session information display and replace with appropriate
    // post-checkout details
    return (
        <div>
            <h1>Payment Result</h1>
            <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
        </div>
    );
}
