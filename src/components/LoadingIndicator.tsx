import React from "react";
import styles from "@/styles/LoadingIndicator.module.css";

export default function LoadingIndicator({
  size = 30,
  color = "#000",
  flex = 1,
}) {
  return (
    <div className={styles["loading-indicator"]} style={{ flex }}>
      <div className={styles["svg-container"]}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g fill={color} fillRule="evenodd" clipRule="evenodd">
              {" "}
              <path
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                opacity=".2"
              ></path>{" "}
              <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
}
