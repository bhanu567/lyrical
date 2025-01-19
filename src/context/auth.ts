import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedin: boolean;
  setIsLoggedin: (status: boolean) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}>({
  isLoggedin: false,
  setIsLoggedin: () => {},
  imageUrl: "",
  setImageUrl: () => {},
});

export default AuthContext;
