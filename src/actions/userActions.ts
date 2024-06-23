"use server";

import supabase from "@/config/supabaseClient";
import { hashPassword } from "@/utils/passwordHasher";

export async function createUser(prevState: any, formData: FormData) {
  let errorMessage = "";
  const user = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { hashedPassword } = await hashPassword(user.password as string);

  if (hashedPassword) {
    user.password = hashedPassword;
    const { data, error } = await supabase.from("users").insert(user).select();

    if (error && error.message.includes("duplicate")) {
      if (error.message.includes("username")) {
        errorMessage = "Username already taken";
      } else if (error.message.includes("email")) {
        errorMessage = "Email is already registered";
      }
    }
    return { data, errorMessage };
  } else {
    return { data: null, errorMessage: "Please Enter a valid password" };
  }
}
