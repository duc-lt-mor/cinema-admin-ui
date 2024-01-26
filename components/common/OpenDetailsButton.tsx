import Link from "next/link";

const OpenDetailsButton = (props: { detailsPageUrl: string }) => {
  return (
    <button className="hover:cursor-pointer" title="See film details">
      <Link href={props.detailsPageUrl}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </Link>
    </button>
  );
};

export default OpenDetailsButton;
