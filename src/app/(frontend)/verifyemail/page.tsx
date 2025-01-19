"use client";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

export default function VerifyEmailPage() {
  const router = useRouter();

  const verifyUserEmail = async (urlToken: string) => {
    try {
      const response: any = await axios.post("/api/users/verifyemail", {
        urlToken,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        router.back();
      }
    } catch (error: any) {
      toast.error(error.message);
      router.replace("/signup");
    }
  };

  useEffect(() => {
    const urlToken: string = window.location.search?.split("=")[1] || "";
    if (urlToken.length > 0) {
      verifyUserEmail(urlToken);
    } else {
      toast.error("Sorry! You are not allowed to visit this page");
      router.replace("/signup");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
