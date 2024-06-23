"use client";
import React from "react";
import styles from "@/styles/Stats.module.css";
import { convertToAbbrString } from "@/utils/numberFormatter";
import { getBlogpostByAuthor } from "@/services/blogServices";
import { getCommentsByAuthor } from "@/services/commentServices";
import { useUserContext } from "@/context/UserContext";
import Navigate from "./Navigate";

export default function Stats() {
  const { user } = useUserContext();

  const authorId = user?.id.toString() as string;

  const authorPosts = getBlogpostByAuthor(authorId);
  const authorComments = getCommentsByAuthor(authorId);

  return (
    <div className={styles["stats"]}>
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
          <h3>{authorPosts.length}</h3>
          <p>Posts</p>
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
          <h3>
            {convertToAbbrString(
              authorPosts.reduce((acc, curr) => acc + curr.views, 0)
            )}
          </h3>
          <p>Reads</p>
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
          style={{ backgroundColor: "#D0FBE3" }}
        >
          <svg
            height={40}
            width={40}
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill="#00a86b"
                d="M60,0H4C1.789,0,0,1.789,0,4v40c0,2.211,1.789,4,4,4h8v15c0,0.404,0.243,0.77,0.617,0.924 C12.741,63.976,12.871,64,13,64c0.26,0,0.516-0.102,0.707-0.293L29.414,48H60c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z M15,14 h16c0.553,0,1,0.447,1,1s-0.447,1-1,1H15c-0.553,0-1-0.447-1-1S14.447,14,15,14z M45,34H15c-0.553,0-1-0.447-1-1s0.447-1,1-1h30 c0.553,0,1,0.447,1,1S45.553,34,45,34z M14,27c0-0.553,0.447-1,1-1h24c0.553,0,1,0.447,1,1s-0.447,1-1,1H15 C14.447,28,14,27.553,14,27z M49,22H15c-0.553,0-1-0.447-1-1s0.447-1,1-1h34c0.553,0,1,0.447,1,1S49.553,22,49,22z"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className={styles["text"]}>
          <h3>{convertToAbbrString(authorComments.length)}</h3>
          <p>Comments</p>
        </div>
      </div>
    </div>
  );
}
