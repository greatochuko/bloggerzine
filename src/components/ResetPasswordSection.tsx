"use client";
import { useFormState, useFormStatus } from "react-dom";
import { sendResetPasswordEmail } from "@/actions/authActions";
import styles from "@/app/settings/page.module.css";
import LoadingIndicator from "./LoadingIndicator";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function ResetPasswordSection() {
  const [state, formAction] = useFormState(sendResetPasswordEmail, {
    done: "",
    errorMessage: null,
  });

  const { done, errorMessage } = state;

  useEffect(() => {
    if (done)
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
        });
      } else {
        toast.success(
          "A link to reset your password has been sent to your email",
          {
            position: "top-right",
          }
        );
      }
  }, [done]);

  return (
    <div className={styles["section"]}>
      <h2>Reset Password</h2>
      <form className={styles["reset-password"]} action={formAction}>
        <Button />
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <LoadingIndicator size={20} color="white" />
      ) : (
        "Reset Password"
      )}
    </button>
  );
}
