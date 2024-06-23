"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/SignupForm.module.css";
import Link from "next/link";
import { createUser } from "@/actions/userActions";
import { useFormState } from "react-dom";
import { useUserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";
import Navigate from "./Navigate";

export default function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useUserContext();

  const [state, formAction] = useFormState(createUser, {
    data: null,
    errorMessage: "",
  });

  const { data, errorMessage } = state;

  useEffect(() => {
    if (data) setUser && setUser(data[0]);
  }, [data]);

  const passwordError =
    confirmPassword.length && password !== confirmPassword ? true : false;

  if (user) {
    redirect("/");
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
        {passwordError ? (
          <p className={styles["error"]}>Passwords do not match</p>
        ) : null}
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
      </div>
      <div className={styles["actions"]}>
        <button type="submit" disabled={passwordError}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </div>
    </form>
  );
}
