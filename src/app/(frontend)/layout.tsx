"use client";
import AuthContext from "@/context/auth";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
export default function ContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  return (
    <AuthContext.Provider
      value={{ isLoggedin, setIsLoggedin, imageUrl, setImageUrl }}
    >
      <div className="relative w-full flex items-center justify-center ">
        <Navbar />
      </div>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}
