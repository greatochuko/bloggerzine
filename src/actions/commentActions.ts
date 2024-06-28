"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function postComment(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    parentId: formData.get("parentId") || null,
    blogpost: formData.get("blogpost") as string,
    comment: formData.get("comment") as string,
  };

  const { error } = await supabase.from("comments").insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { errorMessage: error?.message };
}
