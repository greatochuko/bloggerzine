import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProvider from "@/context/UserContext";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: { absolute: "Bloggerzine", template: "%s - Bloggerzine" },
  description:
    "Welcome to our next-generation blog, your ultimate destination for the latest news and captivating stories!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Header user={user} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}
