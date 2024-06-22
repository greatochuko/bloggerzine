import React from "react";
import styles from "@/styles/SignoutModal.module.css";

export default function SignoutModal({
  isOpen,
  closeSignoutModal,
}: {
  isOpen: boolean;
  closeSignoutModal: () => void;
}) {
  function handleSignout() {}

  return (
    <div
      className={`${styles["overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={closeSignoutModal}
    >
      <div
        className={styles["signout-modal"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["main"]}>
          <div className={styles["icon"]}>
            <svg
              height={20}
              width={20}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#e32636"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
                ></path>
              </g>
            </svg>
          </div>
          <h3>Sign out?</h3>
          <p>Are you sure you want to signout?</p>
        </div>
        <div className={styles["actions"]}>
          <button onClick={closeSignoutModal}>Cancel</button>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      </div>
    </div>
  );
}