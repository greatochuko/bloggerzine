"use client";
import React, { useState } from "react";
import styles from "@/styles/SocialLinksForm.module.css";
import { User } from "@supabase/supabase-js";

export default function SocialLinksForm({ user }: { user: User }) {
  const [facebookLink, setFacebookLink] = useState(
    user.user_metadata.socialLinks.facebook
  );
  const [twitterLink, setTwitterLink] = useState(
    user.user_metadata.socialLinks.twitter
  );
  const [linkedinLink, setLinkedinLink] = useState(
    user.user_metadata.socialLinks.linkedin
  );

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
      <label htmlFor="linkedin">Linkedin</label>
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        placeholder="Enter linkedin URL"
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
