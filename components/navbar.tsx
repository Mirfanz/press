"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
} from "@heroui/navbar";
import { button as buttonStyle } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Avatar } from "@heroui/react";

import { useAuth } from "./auth-provider";
import { SideBarContent } from "./sidebar";

import { ThemeSwitch } from "@/components/theme-switch";

const Navbar = ({ fullContent = false }: { fullContent?: boolean }) => {
  return fullContent ? <NavbarSite /> : <NavbarAuth />;
};

export default Navbar;

const NavbarSite = () => {
  const auth = useAuth();

  return (
    <NextUINavbar
      shouldHideOnScroll
      className="md:bg-slate-50 md:dark:bg-slate-950"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent>
        <NavbarBrand className="md:hidden">
          <NextLink className="flex items-center gap-1" href="/">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h2 className="font-bold text-inherit">PRESS II</h2>
          </NextLink>
        </NavbarBrand>
        <div className="hidden md:flex items-center gap-2">
          <Avatar
            size="sm"
            src={auth.user?.prefs.image_url || "/default-profile.png"}
          />
          <h4 className="font-medium">{auth.user?.name}</h4>
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          className={clsx(
            "md:hidden",
            buttonStyle({
              variant: "flat",
              isIconOnly: true,
              radius: "sm",
            })
          )}
        />
      </NavbarContent>
      <NavbarMenu className="p-3">
        <SideBarContent />
      </NavbarMenu>
    </NextUINavbar>
  );
};

const NavbarAuth = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <NextLink className="flex items-center gap-1" href="/">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h2 className="font-bold text-inherit">PRESS II</h2>
          </NextLink>
        </NavbarBrand>
        <NavbarContent justify="end">
          <ThemeSwitch />
        </NavbarContent>
      </NavbarContent>
    </NextUINavbar>
  );
};
