import { UserType } from "@/context/UserContext";
import { signIn } from "@/auth";
import supabase from "@/config/supabaseClient";

const users: UserType[] = [
  {
    firstname: "Great",
    lastname: "Ochuko",
    username: "greatochuko",
    jobTitle: "Web Developer",
    email: "great@gmail.com",
    imageUrl: "/profile-pic.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 1,
    facebook: "",
    twitter: "",
    linkedIn: "",
  },
  {
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    jobTitle: "Graphics Designer",
    email: "john@gmail.com",
    imageUrl: "/user-2.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 2,
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

export async function loginWithGoogle() {
  "use server";
  await signIn("google");
}
