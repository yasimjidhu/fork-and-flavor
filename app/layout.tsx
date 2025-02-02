
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { Navbar } from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fork And Flavor",
  description: "Find your favorite recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-6 lg:px-0`}
      >
        <AuthProvider>
          <SearchProvider>
            <Navbar />
            {children}
            <Footer/>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
