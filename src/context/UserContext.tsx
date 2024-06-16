"use client";
import React, { createContext, useContext, useState } from "react";

export type UserType = {
  name: string;
  occupation: string;
  email: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  id: number;
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>> | null;
};

const great = {
  name: "Great Ochuko",
  occupation: "Web Developer",
  email: "great@gmail.com",
  imageUrl: "/profile-pic.jpg",
  coverImageUrl: "/cover-image.jpg",
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
