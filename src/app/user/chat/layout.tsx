"use client";
import * as React from "react";
import "../../globals.css";
import Sidebar from "./_components/Sidebar";
import { DrawerProvider } from "./_components/DrawerContext";
import { ChatContextProvider } from "./_components/ChatContext";

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen flex">
        <ChatContextProvider>
          <DrawerProvider>
            <Sidebar />
            <main className="w-screen h-screen flex">{children}</main>
          </DrawerProvider>
        </ChatContextProvider>
      </body>
    </html>
  );
}
