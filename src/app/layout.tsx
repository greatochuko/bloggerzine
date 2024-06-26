import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProvider from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/services/userServices";

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
  const { data } = await supabase.auth.getUser();

  const user = data.user ? await getUser(data.user.id) : null;

  // const user = null;

  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Header user={user?.author} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}
