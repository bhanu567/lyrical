"use client";

import React, { useContext, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileIcon, { LoginButton, LogoutButton } from "./ProfileIcon";
import AuthContext from "@/context/auth";

function Navbar({ className }: { className?: string }) {
  const authContext = useContext(AuthContext);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const isDisplayNavbar: boolean =
    pathname === "/login" ||
    pathname === "/forgetpassword" ||
    pathname === "/resetpassword" ||
    pathname === "/signup" ||
    pathname === "/verifyemail";
  return (
    <>
      {isDisplayNavbar ? (
        <></>
      ) : (
        <div
          className={cn(
            "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
            className
          )}
        >
          {authContext.isLoggedin && (
            <ProfileIcon imgUrl={authContext.imageUrl} />
          )}
          <Menu setActive={setActive}>
            <Link href={"/"}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Home"
              ></MenuItem>
            </Link>
            <Link href={"/courses"}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="All Courses"
              ></MenuItem>
            </Link>
            <MenuItem setActive={setActive} active={active} item="About Us">
              <div className="flex flex-col space-y-4 text-sm px-3">
                <HoveredLink href="/#featuredCourses">
                  Featured Courses
                </HoveredLink>
                <HoveredLink href="/#whyChooseUs">Why Choose Us</HoveredLink>
                <HoveredLink href="/#testimonials">Testimonials</HoveredLink>
                <HoveredLink href="/#upcomingWebinars">
                  Upcoming Webinars
                </HoveredLink>
                <HoveredLink href="#instructor">Instructors</HoveredLink>
              </div>
            </MenuItem>
            <Link href={"/contact"}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Contact Us"
              ></MenuItem>
            </Link>
          </Menu>
          {authContext.isLoggedin ? <LogoutButton /> : <LoginButton />}
        </div>
      )}
    </>
  );
}

export default Navbar;
