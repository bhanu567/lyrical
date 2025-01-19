"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "../verifyemail/spinner";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await axios.post("/api/users/forgetpassword", { email });

      if (res.status === 200) toast.success(res.data.message);
      router.replace("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                placeholder="username@email.com"
                type="email"
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
};

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

export default ForgetPassword;
