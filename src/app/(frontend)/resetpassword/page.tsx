"use client";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import Spinner from "../verifyemail/spinner";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword != confirmPassword) {
      toast.error("New Password & Confirm Passwordd Should be Same");
    } else {
      try {
        const response: any = await axios.post(
          "/api/users/resetpassword?token=" + token,
          {
            newPassword,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          router.replace("/login");
        }
      } catch (error: any) {
        toast.error(error.message);
        router.back();
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const queryToken = window.location.search?.split("=")[1] || "";
    setToken(queryToken);
    if (!(queryToken.length > 0)) {
      toast.error("Sorry! You are not allowed to visit this page");
      router.replace("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className="flex justify-center items-center mb-5">
            <img src="/icon.png" alt="logo" className="h-10 w-10" />
          </div>
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">New Password</Label>
              <Input
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br mt-10 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-[5px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={submitHandler}
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
