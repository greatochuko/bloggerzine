"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/PostForm.module.css";
import { categories } from "./Category";
import { BlogpostType } from "./Hero";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "@/utils/imageUploader";
import Image from "next/image";
import LoadingIndicator from "./LoadingIndicator";
import {
  publishPost,
  saveAsDraft,
  updateAsDraft,
  updatePost,
} from "@/actions/blogActions";

export default function CreatePostForm({ blogpost }: { blogpost?: BlogpostType }) {
  const [title, setTitle] = useState(blogpost?.title || "");
  const [thumbnail, setThumbnail] = useState({
    loading: false,
    url: blogpost?.thumbnail || "/default-cover-image.jpg",
  });
  const [content, setContent] = useState(blogpost?.content || "");
  const [tags, setTags] = useState(blogpost?.tags || "");
  const [category, setCategory] = useState(blogpost?.category || "");
  const [isFeatured, setIsFeatured] = useState(blogpost?.isFeatured || false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pending, setPending] = useState({
    publish: false,
    saveAsDraft: false,
    update: false,
    updateAsDraft: false,
    loadingThumbnail: false,
  });
  const [error, setError] = useState("");
  const postFormRef = useRef<HTMLFormElement | null>(null);
  const isLoading =
    pending.publish ||
    pending.saveAsDraft ||
    pending.update ||
    pending.updateAsDraft ||
    pending.loadingThumbnail;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  async function handleChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    setPending((curr) => ({ ...curr, loadingThumbnail: true }));
    setThumbnail((curr) => ({ ...curr, loading: true }));
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const { url } = await uploadImage(file);
    setThumbnail({ loading: false, url });
    setPending((curr) => ({ ...curr, loadingThumbnail: false }));
  }

  async function handlePublish() {
    setError("");
    setPending((curr) => ({ ...curr, publish: true }));
    const formData = new FormData(postFormRef.current || undefined);
    const data = await publishPost(formData);
    if (data) setError(data.errorMessage);
    setPending((curr) => ({ ...curr, publish: false }));
  }

  async function handleSaveAsDraft() {
    setError("");
    setPending((curr) => ({ ...curr, saveAsDraft: true }));
    const formData = new FormData(postFormRef.current || undefined);
    const data = await saveAsDraft(formData);
    if (data) setError(data.errorMessage);
    setPending((curr) => ({ ...curr, saveAsDraft: false }));
  }

  async function handleUpdate() {
    setError("");
    setPending((curr) => ({ ...curr, update: true }));
    const formData = new FormData(postFormRef.current || undefined);
    const data = await updatePost(formData);
    if (data) setError(data.errorMessage);
    setPending((curr) => ({ ...curr, update: false }));
  }

  async function handleUpdateAsDraft() {
    setError("");
    setPending((curr) => ({ ...curr, updateAsDraft: true }));
    const formData = new FormData(postFormRef.current || undefined);
    const data = await updateAsDraft(formData);
    if (data) setError(data.errorMessage);
    setPending((curr) => ({ ...curr, updateAsDraft: false }));
  }

  return (
    <form className={styles["post-form"]} ref={postFormRef}>
      {blogpost ? (
        <input type="hidden" name="blogId" defaultValue={blogpost.id} />
      ) : null}
      <div className={styles["input-group"]}>
        <label htmlFor="post-title">Post title</label>
        <input
          type="text"
          id="post-title"
          name="title"
          placeholder="Enter a title for your article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <p>Post Thumbnail</p>
        <label htmlFor="thumbnail-input" className={styles["thumbnail"]}>
          <Image src={thumbnail.url || ""} alt={title} fill sizes=""></Image>
          <div
            className={styles["overlay"]}
            style={{ opacity: thumbnail.loading ? 1 : "" }}
          >
            {thumbnail.loading && <LoadingIndicator color="white" />}
          </div>
        </label>
        <input
          type="file"
          name="thumbnail-input"
          id="thumbnail-input"
          accept="image/*"
          onChange={handleChangeThumbnail}
          hidden
          disabled={thumbnail.loading}
        />
        <input type="hidden" name="thumbnail" value={thumbnail.url} />
      </div>
      <div className={styles["input-group"]}>
        <label>Post body</label>
        {isLoaded && (
          <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ marginBottom: "0", minHeight: "20rem" }}
            modules={modules}
          />
        )}
        <input type="hidden" name="content" value={content} />
      </div>
      <section>
        <div className={`${styles["input-group"]} ${styles["tags"]}`}>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
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
          name="isFeatured"
          id="featured"
          checked={isFeatured}
          onChange={() => setIsFeatured((curr) => !curr)}
        />
        <label htmlFor="featured">Make this post featured?</label>
      </div>
      {error ? <p className={styles["error"]}>{error}</p> : null}
      <div className={styles["actions"]}>
        <button
          onClick={blogpost ? handleUpdateAsDraft : handleSaveAsDraft}
          disabled={isLoading}
        >
          {pending.saveAsDraft || pending.updateAsDraft ? (
            <>
              <LoadingIndicator size={20} color="#333" flex={0} />
              Saving...
            </>
          ) : (
            "Save as draft"
          )}
        </button>
        <button
          onClick={blogpost ? handleUpdate : handlePublish}
          disabled={isLoading}
          className={styles["submit"]}
        >
          {pending.publish || pending.update ? (
            <>
              <LoadingIndicator size={20} color="white" flex={0} />
              {blogpost ? "Updating..." : "Publishing..."}
            </>
          ) : blogpost ? (
            "Update"
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}
