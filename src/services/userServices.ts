import supabase from "@/config/supabaseClient";
import { UserType } from "@/context/UserContext";
import { signIn } from "@/auth";

const users: UserType[] = [
  {
    fullname: "Great Ochuko",
    username: "greatochuko",
    jobTitle: "Web Developer",
    email: "great@gmail.com",
    imageUrl: "/profile-pic.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    _id: 1,
    facebook: "",
    twitter: "",
    linkedIn: "",
  },
  {
    fullname: "John Doe",
    username: "johndoe",
    jobTitle: "Graphics Designer",
    email: "john@gmail.com",
    imageUrl: "/user-2.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    _id: 2,
    facebook: "",
    twitter: "",
    linkedIn: "",
  },
];

export function getUsers() {
  return users;
}

export function getUser(username: string) {
  return users.find((user) => user.username === username);
}

export function getUserDashboard() {
  return users[0];
}

export async function createUser(user: UserType) {
  const { data, error } = await supabase.from("user").insert([user]).select();
}

export async function loginWithGoogle() {
  "use server";
  await signIn("google");
}
