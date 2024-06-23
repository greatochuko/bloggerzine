"use server";

import supabase from "@/config/supabaseClient";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "@/utils/passwordHasher";

export async function signup(prevState: any, formData: FormData) {
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

    if (data) {
      const jwtSecret = process.env.JWT_SECRET as string;
      const token = jwt.sign({ username: data[0].username }, jwtSecret, {
        expiresIn: "7d",
      });
      return { data: { userProfile: data[0], token }, errorMessage };
    } else {
      if (error.message.includes("duplicate")) {
        if (error.message.includes("username")) {
          errorMessage = "Username already taken";
        } else if (error.message.includes("email")) {
          errorMessage = "Email is already registered";
        } else {
          errorMessage = "Something went wrong";
        }
      }
    }
  }
  return { data: null, errorMessage: "Please Enter a valid password" };
}

export async function login(prevState: any, formData: FormData) {
  let errorMessage = "";
  const email = formData.get("email");
  const password = formData.get("password");

  const { data } = await supabase.from("users").select("*").eq("email", email);

  if (data) {
    const passwordIsCorrect = await comparePassword(
      password as string,
      data[0].password
    );
    if (passwordIsCorrect) {
      const jwtSecret = process.env.JWT_SECRET as string;
      const token = jwt.sign({ username: data[0].username }, jwtSecret, {
        expiresIn: "7d",
      });
      return { data: { userProfile: data[0], token }, errorMessage: null };
    }
  }

  errorMessage = "Invalid username and password combination";
  return { data: null, errorMessage };
}
