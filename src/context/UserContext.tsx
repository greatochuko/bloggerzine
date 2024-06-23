"use client";
import React, { createContext, useContext, useState } from "react";

export type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  jobTitle: string;
  email: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  id: number;
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
  facebook: "",
  twitter: "",
  linkedIn: "",
  bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
  id: 1,
};

const initialState = { user: null, setUser: null };
const UserContext = createContext<UserContextType>(initialState);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);

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
