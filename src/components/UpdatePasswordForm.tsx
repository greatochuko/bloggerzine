"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/UpdatePasswordForm.module.css";
import { useFormState, useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { redirect, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/authActions";

export default function UpdatePasswordForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [state, loginAction] = useFormState(resetPassword, {
    errorMessage: "",
  });

  const { errorMessage } = state;

  let passwordError;
  if (confirmPassword.length && password !== confirmPassword) {
    passwordError = "Passwords do not match";
  }
  if (password.length && password.length < 6) {
    passwordError = "Password must be at least 6 characters long";
  }

  const error = passwordError || errorMessage;
  const cannotSubmit = !password || !confirmPassword || !!passwordError;

  return (
    <form className={styles["update-password-form"]} action={loginAction}>
      <div className={styles["input-group"]}>
        <label htmlFor="password">New password</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="confirm-password">Re-enter New Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="********"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error ? <p className={styles["error"]}>{error}</p> : null}
      </div>
      <Button disabled={cannotSubmit} />
    </form>
  );
}

function Button({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={disabled}>
      {pending ? (
        <>
          <LoadingIndicator size={20} color="#fff" />
          Updating...
        </>
      ) : (
        "Update Password"
      )}
    </button>
  );
}
