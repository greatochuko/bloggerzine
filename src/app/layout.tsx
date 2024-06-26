import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUser, User } from "@/services/userServices";

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
  const user: User | null = null;

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
