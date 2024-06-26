"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@/services/userServices";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
};

const great = {
  fullname: "Great Ochuko",
  username: "greatochuko",
  jobTitle: "Web Developer",
  email: "great@gmail.com",
  imageUrl: "/placeholder-profile-image.jpg",
  coverImageUrl: "/placeholder-cover-image.jpg",
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (data && !error) {
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

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
