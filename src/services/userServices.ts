import { User } from "@supabase/supabase-js";

const users: User[] = [
  {
    user_metadata: {
      firstname: "Great",
      lastname: "Ochuko",
      username: "greatochuko",
      jobTitle: "Web Developer",
      imageUrl: "/profile-pic.jpg",
      coverImageUrl: "/cover-image.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      facebook: "",
      twitter: "",
      linkedIn: "",
    },
    email: "great@gmail.com",
    id: "1",
  },
  {
    user_metadata: {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      jobTitle: "Graphics Designer",
      imageUrl: "/user-2.jpg",
      coverImageUrl: "/cover-image.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      facebook: "",
      twitter: "",
      linkedIn: "",
    },
    email: "john@gmail.com",
    id: "2",
  },
];

export function getUsers() {
  return users;
}

export function getUser(username: string) {
  return users.find((user) => user.user_metadata.username === username);
}

export function getUserDashboard() {
  return users[0];
}
