"use client";
import React, { useState } from "react";
import styles from "@/styles/SocialLinksForm.module.css";
import { UserType } from "@/context/UserContext";

export default function SocialLinksForm({ user }: { user: UserType }) {
  const [facebookLink, setFacebookLink] = useState(user.socialLinks.facebook);
  const [twitterLink, setTwitterLink] = useState(user.socialLinks.twitter);
  const [linkedinLink, setLinkedinLink] = useState(user.socialLinks.linkedin);

  return (
    <form className={styles["social-links-form"]}>
      <label htmlFor="facebook">Facebook</label>
      <input
        type="text"
        id="facebook"
        name="facebook"
        value={facebookLink}
        onChange={(e) => setFacebookLink(e.target.value)}
      />
      <label htmlFor="twitter">Twitter</label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        value={twitterLink}
        onChange={(e) => setTwitterLink(e.target.value)}
      />
      <label htmlFor="linkedin">Linkedin</label>
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        value={linkedinLink}
        onChange={(e) => setLinkedinLink(e.target.value)}
      />
      <div className={styles["actions"]}>
        <button type="reset">Reset</button>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
