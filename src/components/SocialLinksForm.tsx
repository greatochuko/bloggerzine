"use client";
import React, { useState } from "react";
import styles from "@/styles/SocialLinksForm.module.css";
import { User } from "@/services/userServices";

export default function SocialLinksForm({ user }: { user: User }) {
  const [facebookLink, setFacebookLink] = useState(user.socialLinks.facebook);
  const [twitterLink, setTwitterLink] = useState(user.socialLinks.twitter);
  const [linkedInLink, setLinkedinLink] = useState(user.socialLinks.linkedIn);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form className={styles["social-links-form"]} onSubmit={handleSubmit}>
      <label htmlFor="facebook">Facebook</label>
      <input
        type="text"
        id="facebook"
        name="facebook"
        placeholder="Enter facebook URL"
        value={facebookLink}
        onChange={(e) => setFacebookLink(e.target.value)}
      />
      <label htmlFor="twitter">Twitter</label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        placeholder="Enter twitter URL"
        value={twitterLink}
        onChange={(e) => setTwitterLink(e.target.value)}
      />
      <label htmlFor="linkedIn">Linkedin</label>
      <input
        type="text"
        id="linkedIn"
        name="linkedIn"
        placeholder="Enter linkedIn URL"
        value={linkedInLink}
        onChange={(e) => setLinkedinLink(e.target.value)}
      />
      <div className={styles["actions"]}>
        <button type="reset">Reset</button>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
