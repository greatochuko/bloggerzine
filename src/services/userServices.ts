const users = [
  {
    fullname: "Great Ochuko",
    username: "greatochuko",
    jobTitle: "Web Developer",
    email: "great@gmail.com",
    imageUrl: "/profile-pic.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 1,
    socialLinks: {},
  },
  {
    fullname: "John Doe",
    username: "johndoe",
    jobTitle: "Graphics Designer",
    email: "john@gmail.com",
    imageUrl: "/user-2.jpg",
    coverImageUrl: "/cover-image.jpg",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    id: 2,
    socialLinks: {},
  },
];

export function getUsers() {
  return users;
}

export function getUser(username: string) {
  console.log(username);
  return users.find((user) => user.username === username);
}

export function getUserDashboard() {
  return users[0];
}
