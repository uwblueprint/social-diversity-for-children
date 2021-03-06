import * as React from "react";

function SvgInfoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M41.25 26.25H48.75V33.75H41.25V26.25ZM41.25 41.25H48.75V63.75H41.25V41.25ZM45 7.5C24.3 7.5 7.5 24.3 7.5 45C7.5 65.7 24.3 82.5 45 82.5C65.7 82.5 82.5 65.7 82.5 45C82.5 24.3 65.7 7.5 45 7.5ZM45 75C28.4625 75 15 61.5375 15 45C15 28.4625 28.4625 15 45 15C61.5375 15 75 28.4625 75 45C75 61.5375 61.5375 75 45 75Z"
                fill="#0C53A0"
            />
        </svg>
    );
}

export default SvgInfoIcon;
