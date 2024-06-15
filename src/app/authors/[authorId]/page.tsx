import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";

const user = {
  name: "Great Ochuko",
  occupation: "Web Developer",
  email: "great@gmail.com",
  imageUrl: "/profile-pic.jpg",
  bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
  id: 1,
};

export default function ProfilePage() {
  return (
    <div className={styles["profile-page"]}>
      <Stats />
      <AboutAuthor user={user} />
    </div>
  );
}
