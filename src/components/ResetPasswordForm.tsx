"use client";
import React, { useState } from "react";
import { resetPassword } from "@/actions/authActions";
import styles from "@/app/(auth)/reset-password/page.module.css";
import { useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function ResetPasswordForm({ email }: { email: string }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  let errorMessage =
    newPassword && newPassword.length < 6
      ? "Password must be at least 6 characters"
      : "";

  errorMessage =
    confirmNewPassword && confirmNewPassword !== newPassword
      ? "Passwords do not match"
      : "";

  const cannotSubmit = !newPassword || !confirmNewPassword || !!errorMessage;

  return (
    <form action={resetPassword} className={styles["reset-password-form"]}>
      <div className={styles["input-group"]}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
      </div>
      <input type="hidden" name="email" value={email} />
      <SubmitButton cannotSubmit={cannotSubmit} />
    </form>
  );
}

function SubmitButton({ cannotSubmit }: { cannotSubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={cannotSubmit || pending}>
      {pending ? <LoadingIndicator size={20} color="#fff" /> : "Confirm"}
    </button>
  );
}
