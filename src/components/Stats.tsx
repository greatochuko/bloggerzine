import React from "react";
import styles from "@/styles/Stats.module.css";

export default function Stats() {
  return (
    <div className={styles["stats"]}>
      <div className={styles["stat"]}>
        <div
          className={styles["stat-icon"]}
          style={{ backgroundColor: "#D0FBE3" }}
        >
          <svg
            height={40}
            width={40}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="12" cy="6" r="4" fill="#00a86b"></circle>
              <path
                d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                fill="#00a86b"
              ></path>
            </g>
          </svg>
        </div>
        <div className={styles["text"]}>
          <h3>136k</h3>
          <p>Views</p>
        </div>
      </div>
      <div className={styles["stat"]}>
        <div
          className={styles["stat-icon"]}
          style={{ backgroundColor: "#e6eeff" }}
        >
          <svg
            fill="#2163e8"
            height={40}
            width={40}
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 204.376 204.376"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M110.397,47.736V0H33.13c-2.485,0-4.5,2.015-4.5,4.5v195.376c0,2.485,2.015,4.5,4.5,4.5h138.117c2.485,0,4.5-2.015,4.5-4.5 V61.35h-51.744C116.501,61.35,110.397,55.243,110.397,47.736z M108.499,168.626h-46.5v-10h46.5V168.626z M143.499,143.626h-81.5v-10 h81.5V143.626z M143.499,118.627h-81.5v-10h81.5V118.627z M143.499,93.627h-81.5v-10h81.5V93.627z M120.397,47.736v-37.34 L164.2,51.35h-40.197C122.014,51.35,120.397,49.729,120.397,47.736z"></path>{" "}
            </g>
          </svg>
        </div>
        <div className={styles["text"]}>
          <h3>13</h3>
          <p>Posts</p>
        </div>
      </div>
      <div className={styles["stat"]}>
        <div
          className={styles["stat-icon"]}
          style={{ backgroundColor: "#FFE3E1" }}
        >
          <svg
            height={40}
            width={40}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                fill="#ff5148"
              ></path>
            </g>
          </svg>
        </div>
        <div className={styles["text"]}>
          <h3>136</h3>
          <p>Likes</p>
        </div>
      </div>
      <div className={styles["stat"]}>
        <div
          className={styles["stat-icon"]}
          style={{ backgroundColor: "#FFF5C5" }}
        >
          <svg
            height={40}
            width={40}
            fill="#FFA500"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M746.667 106.667H1173.33V1493.33H746.667V106.667ZM533.333 533.333H106.667V1493.33H533.333V533.333ZM1920 1706.67H0V1824H1920V1706.67ZM1813.33 746.667H1386.67V1493.33H1813.33V746.667Z"></path>{" "}
            </g>
          </svg>
        </div>
        <div className={styles["text"]}>
          <h3>136k</h3>
          <p>Reads</p>
        </div>
      </div>
    </div>
  );
}
