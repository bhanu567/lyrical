"use client";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/auth";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function ProfilePage() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<User>({
    _id: "",
    name: "",
    email: "",
  });
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    async function checkLoggedIn() {
      const res = await axios.get("/api/users/me");
      if (res.data.user._id) {
        setData(res.data.user);
        authCtx.setImageUrl(res.data.user.avatar);
        authCtx.setIsLoggedin(true);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Carousel
        className="w-full max-w-xs"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {Object.values(data)
            .filter((val, index) => index === 1 || index === 3)
            .map((field, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-slate-400 ">
                    <CardContent className="flex aspect-square items-center justify-center p-6 text-center">
                      <span className="text-4xl font-semibold ">
                        {field.includes("@")
                          ? `${field.split("@")[0]}\n @${field.split("@")[1]}`
                          : field}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h2 className="px-5 py-2 my-4 rounded bg-green-800 text-white">
        <Link href={`/profile/${data._id}`}>Get Your Id</Link>
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
