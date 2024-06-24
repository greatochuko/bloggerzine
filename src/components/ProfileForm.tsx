"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/ProfileForm.module.css";
import { User } from "@supabase/supabase-js";

export default function ProfileForm({ user }: { user: User }) {
  const [profilePicture, setProfilePicture] = useState(
    user.user_metadata.imageUrl
  );
  const [coverPhoto, setCoverPhoto] = useState(
    user.user_metadata.coverImageUrl
  );
  const [fullname, setFullname] = useState(
    user.user_metadata.firstname + " " + user.user_metadata.lastname
  );
  const [username, setUsername] = useState(user.user_metadata.username);
  const [jobTitle, setJobTitle] = useState(user.user_metadata.jobTitle);
  const [bio, setBio] = useState(user.user_metadata.bio);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form className={styles["profile-form"]} onSubmit={handleSubmit}>
      <label htmlFor="fullname">Fullname</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        placeholder="Enter fullname"
        required
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Profile picture</p>
      <div className={styles["profile-picture"]}>
        <label
          htmlFor="profile-picture"
          className={styles["profile-picture-container"]}
        >
          <Image
            src={profilePicture}
            alt={
              user.user_metadata.firstname + " " + user.user_metadata.lastname
            }
            fill
            sizes="112px"
          ></Image>
          <div className={styles["overlay"]}>
            <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#fff"
                  d="M21 3H3C1.35 3 0 4.35 0 6v12c0 1.55 1.19 2.83 2.7 2.98.1.01.2.02.3.02h18c.1 0 .2 0 .29-.02.03 0 .06-.01.09-.01C22.86 20.78 24 19.52 24 18V6c0-1.65-1.35-3-3-3zm1 13.53l-2.21-4.42c-.25-.5-.69-.87-1.22-1.03-.19-.05-.38-.08-.57-.08-.35 0-.7.09-1.01.27l-6.41 3.74-2.46-1.67C7.78 13.11 7.39 13 7 13c-.52 0-1.03.2-1.41.59L2 17.18V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v10.53z"
                ></path>
                <circle fill="#fff" cx="11" cy="10" r="2"></circle>
              </g>
            </svg>
          </div>
        </label>
        <input type="file" name="profile-picture" id="profile-picture" />
      </div>
      <p>Cover photo</p>
      <div className={styles["cover-photo"]}>
        <label
          htmlFor="cover-photo"
          className={styles["cover-photo-container"]}
        >
          <Image
            src={coverPhoto}
            alt={
              user.user_metadata.firstname + " " + user.user_metadata.lastname
            }
            fill
            sizes="320px"
          ></Image>
          <div className={styles["overlay"]}>
            <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#fff"
                  d="M21 3H3C1.35 3 0 4.35 0 6v12c0 1.55 1.19 2.83 2.7 2.98.1.01.2.02.3.02h18c.1 0 .2 0 .29-.02.03 0 .06-.01.09-.01C22.86 20.78 24 19.52 24 18V6c0-1.65-1.35-3-3-3zm1 13.53l-2.21-4.42c-.25-.5-.69-.87-1.22-1.03-.19-.05-.38-.08-.57-.08-.35 0-.7.09-1.01.27l-6.41 3.74-2.46-1.67C7.78 13.11 7.39 13 7 13c-.52 0-1.03.2-1.41.59L2 17.18V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v10.53z"
                ></path>
                <circle fill="#fff" cx="11" cy="10" r="2"></circle>
              </g>
            </svg>
          </div>
        </label>
        <input type="file" name="cover-photo" id="cover-photo" />
      </div>
      <label htmlFor="job-title">Job title</label>
      <input
        type="text"
        id="job-title"
        name="job-title"
        placeholder="Enter job title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <label htmlFor="bio">Bio</label>
      <textarea
        name="bio"
        id="bio"
        placeholder="Write about yourself"
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
