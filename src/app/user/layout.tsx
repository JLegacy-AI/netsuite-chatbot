import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "User",
  description: "User dashobard page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className="w-screen h-screen flex justify-center items-center">
          {children}
        </body>
      </html>
    </>
  );
}
