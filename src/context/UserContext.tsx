"use client";
import React, { createContext, useContext, useState } from "react";

export type UserType = {
  fullname: string;
  username: string;
  jobTitle: string;
  email: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  id: number;
  socialLinks: { facebook?: string; twitter?: string; linkedin?: string };
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>> | null;
};

const great = {
  fullname: "Great Ochuko",
  username: "greatochuko",
  jobTitle: "Web Developer",
  email: "great@gmail.com",
  imageUrl: "/profile-pic.jpg",
  coverImageUrl: "/cover-image.jpg",
  bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
  id: 1,
  socialLinks: {},
};

const initialState = { user: null, setUser: null };
const UserContext = createContext<UserContextType>(initialState);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(great);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return userContext;
}
