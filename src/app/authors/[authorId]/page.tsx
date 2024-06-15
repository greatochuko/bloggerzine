import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import { notFound } from "next/navigation";

const users = [
  {
    name: "Great Ochuko",
    occupation: "Web Developer",
    email: "great@gmail.com",
    imageUrl: "/profile-pic.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 1,
  },
  {
    name: "John Doe",
    occupation: "Graphics Designer",
    email: "john@gmail.com",
    imageUrl: "/user-2.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 2,
  },
];

export default function ProfilePage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = Number(params.authorId.split("-").at(-1));
  const user = users.find((u) => u.id === authorId);

  if (!user) notFound();

  return (
    <div className={styles["profile-page"]}>
      <Stats />
      <div className={styles["main"]}>
        <AboutAuthor user={user} />
        <RecentComments />
      </div>
    </div>
  );
}
