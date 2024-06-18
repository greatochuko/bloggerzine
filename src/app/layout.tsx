import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProvider from "@/context/UserContext";

// const inter = Inter({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { absolute: "Bloggerzine", template: "%s - Bloggerzine" },
  description:
    "Welcome to our next-generation blog, your ultimate destination for the latest news and captivating stories!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={nunitoSans.className}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}
