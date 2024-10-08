import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "./globals.css";

const Varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lingoo...",
  description: "Learn, practice and master new languages with Lingoo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={Varela.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
