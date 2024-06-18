"use client";
import React, { useState } from "react";
import styles from "@/styles/CreatePostForm.module.css";
import { categories } from "@/app/categories/page";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
export default function CreatePostForm() {
  const [content, setContent] = useState("");

  console.clear();
  console.log(content);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={styles["create-post-form"]}>
      <div className={styles["input-group"]}>
        <label htmlFor="post-title">Post title</label>
        <input type="text" id="post-title" placeholder="Post name" required />
      </div>
      <div className={styles["input-group"]}>
        <label>Post body</label>
        <JoditEditor
          value={content}
          config={{ height: 400, enter: "p" }}
          onChange={(text) => setContent(text)}
        />
      </div>
      <section>
        <div className={`${styles["input-group"]} ${styles["tags"]}`}>
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" placeholder="design, programming ..." />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            {categories.map((category) => (
              <option value={category.name.toLowerCase()} key={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <div className={styles["checkbox-input-group"]}>
        <input type="checkbox" name="featured" id="featured" />
        <label htmlFor="featured">Make this post featured?</label>
      </div>

      <button type="submit">Create post</button>
    </form>
  );
}
