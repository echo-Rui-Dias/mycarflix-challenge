import * as React from "react";

export default function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 9C1.75 4.99594 4.99594 1.75 9 1.75C13.0041 1.75 16.25 4.99594 16.25 9C16.25 13.0041 13.0041 16.25 9 16.25C4.99594 16.25 1.75 13.0041 1.75 9ZM9 0.25C4.16751 0.25 0.25 4.16751 0.25 9C0.25 13.8325 4.16751 17.75 9 17.75C11.1462 17.75 13.112 16.9773 14.6342 15.6949L17.4697 18.5303C17.7626 18.8232 18.2374 18.8232 18.5303 18.5303C18.8232 18.2374 18.8232 17.7626 18.5303 17.4697L15.6949 14.6342C16.9773 13.112 17.75 11.1462 17.75 9C17.75 4.16751 13.8325 0.25 9 0.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
