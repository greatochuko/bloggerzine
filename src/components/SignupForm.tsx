"use client";
import React, { useState } from "react";
import styles from "@/styles/SignupForm.module.css";
import Link from "next/link";
import LoadingIndicator from "./LoadingIndicator";
import { signup } from "@/actions/authActions";

export default function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  let passwordError;
  if (confirmPassword.length && password !== confirmPassword) {
    passwordError = "Passwords do not match";
  }
  if (password.length && password.length < 6) {
    passwordError = "Password must be at least 6 characters long";
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const eventTarget = e.target as HTMLFormElement;
    const formData = new FormData(eventTarget);
    setError("");
    setPending(true);
    const data = await signup(null, formData);
    const errorMessage = data?.errorMessage;
    if (errorMessage) setError(errorMessage);
    setPending(false);
  }

  const cannotSubmit =
    !!passwordError ||
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    !confirmPassword;

  return (
    <form className={styles["signup-form"]} onSubmit={handleSignup}>
      <div className={styles["flex-group"]}>
        <div className={styles["input-group"]}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder="John"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles["input-group"]}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="johndoe@example.com"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {passwordError || error ? (
          <p className={styles["error"]}>{passwordError || error}</p>
        ) : null}
      </div>
      <div className={styles["actions"]}>
        <button type="submit" disabled={cannotSubmit || pending}>
          {pending ? <LoadingIndicator size={16} color="#fff" /> : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </div>
    </form>
  );
}
