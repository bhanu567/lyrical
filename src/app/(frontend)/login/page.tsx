"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Spinner from "../verifyemail/spinner";
import AuthContext from "@/context/auth";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const classNameForButton =
    "relative group/btn flex space-x-3 items-center justify-start px-4 w-full text-black rounded-[5px] h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]";

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      authContext.setIsLoggedin(true);
      authContext.setImageUrl(response.data.user.avatar);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {loading && <Spinner />}
      {!loading && (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <div className="flex justify-center items-center">
            <img src="/icon.png" alt="logo" className="h-10 w-10" />
          </div>

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email"
                placeholder="username@email.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </LabelInputContainer>

            <button
              className={`bg-gradient-to-br mt-10 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-[5px] h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
              ${buttonDisabled ? " cursor-not-allowed" : ""}`}
              type="submit"
              disabled={buttonDisabled}
            >
              Login &rarr;
              <BottomGradient />
            </button>
            <div className="text-neutral-800 dark:text-neutral-200 my-8 text-center">
              Not Have an Account? Visit&nbsp;&nbsp;
              <Link href="/signup" className="hover:text-neutral-400 font-bold">
                Signup
              </Link>{" "}
              &nbsp;&nbsp;Page
            </div>

            <div className="text-neutral-800 dark:text-neutral-200 my-8 text-right">
              <Link
                href="/forgetpassword"
                className="hover:text-neutral-400 font-bold"
              >
                Forget Password
              </Link>
            </div>

            <div className="bg-gradient-to-r mb-9 from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />

            <div className="flex flex-col space-y-5">
              <Link
                className={classNameForButton}
                href="\api\users\auth\login-using-github"
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  GitHub
                </span>
                <BottomGradient />
              </Link>
              <Link
                className={classNameForButton}
                href="\api\users\auth\login-using-gmail"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </Link>
            </div>
          </form>
        </div>
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
