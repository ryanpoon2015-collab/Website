import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Constants } from "@/classes/Constants";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: Constants.ProjTitle,
  description: "A web-app-interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/images/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body className={twMerge("bg-bg t-text", inter.className)}>
        {children}
      </body>
    </html>
  );
}
