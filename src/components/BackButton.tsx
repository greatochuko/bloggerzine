"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/")}>
      <svg
        fill="#000000"
        height={16}
        width={16}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <polygon points="213.3,205.3 213.3,77.3 0,248 213.3,418.7 213.3,290.7 512,290.7 512,205.3 "></polygon>
        </g>
      </svg>
      Back to home page
    </button>
  );
}
