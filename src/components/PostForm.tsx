"use client";
import React, {
  FormHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/styles/PostForm.module.css";
import { categories } from "@/app/categories/page2";
import { Blogpost } from "./Hero";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "@/utils/imageUploader";
import Image from "next/image";
import LoadingIndicator from "./LoadingIndicator";
import { useFormState, useFormStatus } from "react-dom";
import {
  publishPost,
  saveAsDraft,
  updateAsDraft,
  updatePost,
} from "@/actions/blogActions";

export default function CreatePostForm({ blogpost }: { blogpost?: Blogpost }) {
  const [title, setTitle] = useState(blogpost?.title || "");
  const [thumbnail, setThumbnail] = useState({
    loading: false,
    url: blogpost?.thumbnail || "/default-cover-image.jpg",
  });
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

  async function handleChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    setThumbnail((curr) => ({ ...curr, loading: true }));
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const { url } = await uploadImage(file);
    setThumbnail({ loading: false, url });
  }

  const [publishState, publishAction] = useFormState(publishPost, {
    errorMessage: "",
  });

  const { errorMessage } = publishState;

  const [saveState, saveAsDraftAction] = useFormState(saveAsDraft, {
    errorMessage: "",
  });

  const { errorMessage: saveErrorMessage } = saveState;

  const [updateAsDraftState, updateAsDraftAction] = useFormState(
    updateAsDraft,
    {
      errorMessage: "",
    }
  );

  const { errorMessage: updateAsDraftError } = updateAsDraftState;

  const [updatePostState, updatePostAction] = useFormState(updatePost, {
    errorMessage: "",
  });

  const { errorMessage: updatePostError } = updatePostState;

  const error =
    errorMessage || saveErrorMessage || updatePostError || updateAsDraftError;

  return (
    <form className={styles["create-post-form"]}>
      {blogpost ? (
        <input type="hidden" name="blogId" defaultValue={blogpost._id} />
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
        <ReactQuill
          ref={reactQuillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ marginBottom: "0", minHeight: "20rem" }}
          modules={modules}
        />
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
        <SaveAsDraftButton
          formAction={blogpost ? updateAsDraftAction : saveAsDraftAction}
        />
        <PublishButton
          formAction={blogpost ? updatePostAction : publishAction}
        />
      </div>
    </form>
  );
}

function PublishButton({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      formAction={formAction}
      disabled={pending}
      className={styles["submit"]}
    >
      {pending ? (
        <>
          <LoadingIndicator size={20} color="white" flex={0} />
          Publishing...
        </>
      ) : (
        "Publish"
      )}
    </button>
  );
}

function SaveAsDraftButton({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) {
  const { pending, action } = useFormStatus();

  return (
    <button formAction={formAction} disabled={pending}>
      {pending ? (
        <>
          <LoadingIndicator size={20} color="#333" flex={0} />
          Saving...
        </>
      ) : (
        "Save as draft"
      )}
    </button>
  );
}
