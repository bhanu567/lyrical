"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import AuthContext from "@/context/auth";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileIcon({ imgUrl }: { imgUrl: string }) {
  return (
    <Avatar className="fixed top-10 left-10">
      <AvatarImage src={imgUrl} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

// export function LoginLink() {
//   return (
//     <Link
//       href="/login"
//       className={
//         buttonVariants({ variant: "default", size: "lg" }) +
//         "fixed top-10 right-10"
//       }
//     >
//       Login
//     </Link>
//   );
// }

export function LoginButton() {
  const router = useRouter();
  return (
    <Button
      size="lg"
      className="fixed top-10 right-10"
      onClick={() => router.push("/login")}
    >
      Login
    </Button>
  );
}

export function LogoutButton() {
  const authContext = useContext(AuthContext);
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        authContext.setIsLoggedin(false);
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Button size="lg" className="fixed top-10 right-10" onClick={logoutHandler}>
      Logout
    </Button>
  );
}
