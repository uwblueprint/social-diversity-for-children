import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";

/**
 * This is the page that the user will land on after clicking the
 * magic link in their email
 */
export default function Result(): JSX.Element {
    return null;
}

/**
 * getServerSideProps runs before this page is rendered to check to see if a
 * user has already been authenticated.
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);

    // if the user is already signed up then redirect them to the home page
    if (session && session.role) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // if the user has not signed up then redirect them to the signup page
    return {
        redirect: {
            destination: "/signup",
            permanent: false,
        },
    };
};
