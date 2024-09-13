import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "@/services/userServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: { absolute: "Bloggerzine", template: "%s - Bloggerzine" },
  description:
    "Welcome to our next-generation blog, your ultimate destination for the latest news and captivating stories!",
  authors: [{ name: "Great Ogheneochuko" }],
  openGraph: {
    title: "Bloggerzine",
    type: "website",
    url: "https://bloggerzine.vercel.app",
    images: ["https://bloggerzine.vercel.app/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloggerzine",
    images: ["https://bloggerzine.vercel.app/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
