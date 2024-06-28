import React, { useEffect } from "react";
import styles from "@/styles/EditCommentModal.module.css";
import { useFormState, useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { editComment } from "@/actions/commentActions";
import { CommentType } from "./Comment";

export default function EditCommentModal({
  isOpen,
  closeModal,
  comment,
}: {
  isOpen: boolean;
  closeModal: () => void;
  comment: CommentType | null;
}) {
  const [state, editCommentAction] = useFormState(editComment, {
    done: false,
    errorMessage: "",
  });

  const { done, errorMessage } = state;

  useEffect(() => {
    if (done) {
      closeModal();
    }
  }, [done]);

  return (
    <div
      className={`${styles["overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={closeModal}
    >
      <div
        className={styles["edit-comment-modal"]}
        onClick={(e) => e.stopPropagation()}
      >
        <form action={editCommentAction}>
          <h2>Edit Comment</h2>
          <textarea
            name="comment"
            id="comment"
            defaultValue={comment?.comment}
          ></textarea>
          <input
            type="hidden"
            name="commentId"
            hidden
            defaultValue={comment?.id}
          />
          <div className={styles["actions"]}>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit">
      {pending ? (
        <>
          <LoadingIndicator color="white" size={20} />
          Editing...
        </>
      ) : (
        "Edit"
      )}
    </button>
  );
}
