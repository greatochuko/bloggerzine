import React, { useState } from "react";
import styles from "@/styles/DeletePostModal.module.css";
import LoadingIndicator from "./LoadingIndicator";
import { BlogpostType } from "./Hero";
import { deletePost } from "@/actions/blogActions";

export default function DeletePostModal({
  isOpen,
  closeModal,
  post,
}: {
  isOpen: boolean;
  closeModal: () => void;
  post: BlogpostType | null;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function handleDeletePost(e: React.FormEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    setPending(true);
    setError("");
    const { errorMessage } = await deletePost(formData);
    errorMessage && setError(errorMessage);
    setPending(false);
  }
  return (
    <div
      className={`${styles["overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={closeModal}
    >
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
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
          <h3>Delete Post?</h3>
          <p>
            Are you sure you want to delete post &ldquo;{post?.title}&rdquo;?
          </p>
        </div>
        <div className={styles["actions"]}>
          <button onClick={closeModal}>Cancel</button>
          <form onSubmit={handleDeletePost}>
            <input
              type="hidden"
              hidden
              defaultValue={post?.id!}
              name="postId"
            />
            <button>
              {pending ? (
                <>
                  <LoadingIndicator color="white" size={20} />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
