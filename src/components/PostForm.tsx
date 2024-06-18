"use client";
import React, { useState } from "react";
import styles from "@/styles/PostForm.module.css";
import { categories } from "@/app/categories/page";
import { BlogPost } from "./Hero";

export default function CreatePostForm({ blogpost }: { blogpost?: BlogPost }) {
  const [title, setTitle] = useState(blogpost?.title || "");
  const [content, setContent] = useState(blogpost?.content || "");
  const [tags, setTags] = useState(blogpost?.tags || "");
  const [category, setCategory] = useState(blogpost?.category || "");
  const [isFeatured, setIsFeatured] = useState(blogpost?.isFeatured || false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={styles["create-post-form"]}>
      <div className={styles["input-group"]}>
        <label htmlFor="post-title">Post title</label>
        <input
          type="text"
          id="post-title"
          placeholder="Post name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label>Post body</label>
        <textarea name="" id=""></textarea>
      </div>
      <section>
        <div className={`${styles["input-group"]} ${styles["tags"]}`}>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="design, programming ..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option value={category.name.toLowerCase()} key={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <div className={styles["checkbox-input-group"]}>
        <input
          type="checkbox"
          name="featured"
          id="featured"
          checked={isFeatured}
          onChange={() => setIsFeatured((curr) => !curr)}
        />
        <label htmlFor="featured">Make this post featured?</label>
      </div>

      <button type="submit">Create post</button>
    </form>
  );
}
