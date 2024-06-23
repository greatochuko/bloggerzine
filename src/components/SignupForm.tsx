"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/SignupForm.module.css";
import Link from "next/link";
import { signup } from "@/actions/userActions";
import { useFormState, useFormStatus } from "react-dom";
import { useUserContext } from "@/context/UserContext";
import { redirect, useSearchParams } from "next/navigation";
import Navigate from "./Navigate";
import LoadingIndicator from "./LoadingIndicator";

export default function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useUserContext();

  const [state, formAction] = useFormState(signup, {
    data: null,
    errorMessage: "",
  });

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const { data, errorMessage } = state;

  useEffect(() => {
    if (data && setUser) {
      localStorage.setItem("token", data.token);
      setUser(data.userProfile);
    }
  }, [data]);

  let passwordError;
  if (confirmPassword.length && password !== confirmPassword) {
    passwordError = "Passwords do not match";
  }
  if (password.length && password.length < 8) {
    passwordError = "Password must be at least 8 characters long";
  }

  if (user) {
    redirect(redirectTo || "/");
  }

  return (
    <form
      action={passwordError ? undefined : formAction}
      className={styles["signup-form"]}
    >
      <div className={styles["flex-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            id="firstname"
            name="firstname"
            required
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lastname"
            name="lastname"
            required
          />
        </div>
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          placeholder="********"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {passwordError || errorMessage ? (
          <p className={styles["error"]}>{passwordError || errorMessage}</p>
        ) : null}
      </div>
      <div className={styles["actions"]}>
        <Button passwordError={passwordError} />
        <p>
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </div>
    </form>
  );
}

function Button({ passwordError }: { passwordError?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={!!passwordError}>
      {pending ? <LoadingIndicator size={20} color="#fff" /> : "Sign Up"}
    </button>
  );
}
