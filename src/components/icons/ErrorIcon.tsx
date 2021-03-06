import * as React from "react";

function SvgErrorIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="155"
            height="155"
            viewBox="0 0 155 155"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="77.5" cy="77.5" r="77.5" fill="#CFD7E0" />
            <rect
                x="35.4297"
                y="97.428"
                width="11.0149"
                height="11.0149"
                rx="5.50744"
                fill="white"
            />
            <rect
                x="108.129"
                y="97.428"
                width="11.0149"
                height="11.0149"
                rx="5.50744"
                fill="white"
            />
            <path
                d="M55.3574 124C55.3574 124 65.6908 117.357 78.6074 117.357C91.5241 117.357 101.857 124 101.857 124"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default SvgErrorIcon;
