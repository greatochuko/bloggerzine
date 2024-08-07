import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUser } from "@/services/userServices";
import { createClient } from "@/utils/supabase/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: { absolute: "Bloggerzine", template: "%s - Bloggerzine" },
  description:
    "Welcome to our next-generation blog, your ultimate destination for the latest news and captivating stories!",
  authors: [{ name: "Great Ogheneochuko" }],
  openGraph: {
    title: "Great Ogheneochuko",
    type: "website",
    url: "https://bloggerzine.vercel.app",
    images: ["https://bloggerzine.vercel.app/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Ogheneochuko",
    images: ["https://bloggerzine.vercel.app/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  let user = null;

  if (data.user) {
    const { user: userProfile, error } = await getUser(data.user.id);
    if (!error) {
      user = userProfile;
    }
  }

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
