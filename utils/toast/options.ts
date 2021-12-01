import { UseToastOptions } from "@chakra-ui/react";

/**
 * infoToastOptions returns the toast options to render a consistent info toast
 * @param  {string} title title of toast
 * @param  {string} description desc of toast
 * @returns UseToastOptions
 */
export function infoToastOptions(title: string, description: string): UseToastOptions {
    return simpleToastOptions(title, description, "info");
}

/**
 * errorToastOptions returns the toast options to render a consistent error toast
 * @param  {string} title title of toast
 * @param  {string} description desc of toast
 * @returns UseToastOptions
 */
export function errorToastOptions(title: string, description: string): UseToastOptions {
    return simpleToastOptions(title, description, "error");
}

/**
 * simpleToastOptions returns the toast options to render a consistent toast
 * @param  {string} title title of toast
 * @param  {string} description desc of toast
 * @returns UseToastOptions
 */
function simpleToastOptions(
    title: string,
    description: string,
    status: "info" | "error",
): UseToastOptions {
    return {
        title,
        description,
        status,
        duration: 9000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
    };
}
