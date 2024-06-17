"use client";
import { UserType } from "@/context/UserContext";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/ProfileForm.module.css";

export default function ProfileForm({ user }: { user: UserType }) {
  const [profilePicture, setProfilePicture] = useState(user.imageUrl);
  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [bio, setBio] = useState(user.bio);

  return (
    <form className={styles["profile-form"]}>
      <label htmlFor="fullname">Fullname</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="profile-picture">Profile Picture</label>
      <div className={styles["profile-picture"]}>
        <div className={styles["profile-picture-container"]}>
          <Image
            src={profilePicture}
            alt={user.fullname}
            fill
            sizes="112px"
          ></Image>
        </div>
        <input type="file" name="profile-picture" id="profile-picture" />
      </div>
      <label htmlFor="job-title">Job title</label>
      <input
        type="text"
        id="job-title"
        name="job-title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <label htmlFor="bio">Bio</label>
      <textarea
        name="bio"
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <div className={styles["actions"]}>
        <button type="reset">Reset</button>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
