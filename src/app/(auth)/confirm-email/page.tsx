import React from "react";
import styles from "./page.module.css";
import EmailVerificationForm from "@/components/EmailVerificationForm";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Confirm Email" };

export default function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const token = jwt.verify(searchParams.token, process.env.JWT_SECRET!);
  const email = (token as JwtPayload)?.email;
  const firstname = (token as JwtPayload)?.firstname;

  if (!email) redirect("/signup");

  return (
    <div className={styles["confirm-email-page"]}>
      <div className={styles["container"]}>
        <div className={styles["icon"]}>
          <svg
            height={32}
            width={32}
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
              {" "}
              <rect width="24" height="24" fill="white"></rect>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.96802 4H18.032C18.4706 3.99999 18.8491 3.99998 19.1624 4.02135C19.4922 4.04386 19.8221 4.09336 20.1481 4.22836C20.8831 4.53284 21.4672 5.11687 21.7716 5.85195C21.9066 6.17788 21.9561 6.50779 21.9787 6.83762C22 7.15088 22 7.52936 22 7.96801V16.032C22 16.4706 22 16.8491 21.9787 17.1624C21.9561 17.4922 21.9066 17.8221 21.7716 18.1481C21.4672 18.8831 20.8831 19.4672 20.1481 19.7716C19.8221 19.9066 19.4922 19.9561 19.1624 19.9787C18.8491 20 18.4706 20 18.032 20H5.96801C5.52936 20 5.15088 20 4.83762 19.9787C4.50779 19.9561 4.17788 19.9066 3.85195 19.7716C3.11687 19.4672 2.53284 18.8831 2.22836 18.1481C2.09336 17.8221 2.04386 17.4922 2.02135 17.1624C1.99998 16.8491 1.99999 16.4706 2 16.032V7.96802C1.99999 7.52937 1.99998 7.15088 2.02135 6.83762C2.04386 6.50779 2.09336 6.17788 2.22836 5.85195C2.53284 5.11687 3.11687 4.53284 3.85195 4.22836C4.17788 4.09336 4.50779 4.04386 4.83762 4.02135C5.15088 3.99998 5.52937 3.99999 5.96802 4ZM4.31745 6.27777C4.68114 5.86214 5.3129 5.82002 5.72854 6.1837L11.3415 11.095C11.7185 11.4249 12.2815 11.4249 12.6585 11.095L18.2715 6.1837C18.6871 5.82002 19.3189 5.86214 19.6825 6.27777C20.0462 6.69341 20.0041 7.32517 19.5885 7.68885L13.9755 12.6002C12.8444 13.5899 11.1556 13.5899 10.0245 12.6002L4.41153 7.68885C3.99589 7.32517 3.95377 6.69341 4.31745 6.27777Z"
                fill="#16a34a"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <h1>Please verify your email</h1>
        <p>
          You&apos;re almost there! We sent and email to <br />
          <strong>{email}</strong>
        </p>
        <p>
          Just click on the link in that email to complete your signup. If you
          don&apos;t see it, you may need to{" "}
          <strong>check your spam folder</strong>.
        </p>
        <p>Still can&apos;t find the email? No problem.</p>
        <EmailVerificationForm email={email} firstname={firstname} />
      </div>
    </div>
  );
}
