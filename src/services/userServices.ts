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

export function getUsers() {
  return users;
}

export function getUser(userId: string) {
  return users.find((u) => u.id === Number(userId));
}

export function getUserDashboard() {
  return {
    name: "Great Ochuko",
    occupation: "Web Developer",
    email: "great@gmail.com",
    imageUrl: "/profile-pic.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 1,
  };
}
