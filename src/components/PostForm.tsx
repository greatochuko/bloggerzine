"use client";
import React, { useCallback, useRef, useState } from "react";
import styles from "@/styles/PostForm.module.css";
import { categories } from "@/app/categories/page";
import { BlogPost } from "./Hero";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "@/utils/imageUploader";

export default function CreatePostForm({ blogpost }: { blogpost?: BlogPost }) {
  const [title, setTitle] = useState(blogpost?.title || "");
  const [content, setContent] = useState(blogpost?.content || "");
  const [tags, setTags] = useState(blogpost?.tags || "");
  const [category, setCategory] = useState(blogpost?.category || "");
  const [isFeatured, setIsFeatured] = useState(blogpost?.isFeatured || false);

  const reactQuillRef = useRef<ReactQuill | null>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const quill = reactQuillRef.current;
        const { url: imageUrl } = await uploadImage(file);
        if (quill) {
          const range = quill.getEditorSelection();
          range &&
            quill.getEditor().insertEmbed(range.index, "image", imageUrl);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
  }

  async function handleEditPost(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={blogpost ? handleEditPost : handleCreatePost}
      className={styles["create-post-form"]}
    >
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
        <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ marginBottom: "0", minHeight: "20rem" }}
          modules={modules}
        />
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

      <button type="submit">{blogpost ? "Save Changes" : "Create post"}</button>
    </form>
  );
}
