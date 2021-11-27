function LiveIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="5" cy="5" r="5" fill="#F02020" />
        </svg>
    );
}

export default LiveIcon;
