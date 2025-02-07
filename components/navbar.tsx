"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { button as buttonStyle } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { useAuth } from "./auth-provider";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) return <NavbarAuth />;

  return <NavbarSite />;
};

export default Navbar;

const NavbarSite = () => {
  const pathname = usePathname();
  const auth = useAuth();

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
        <NavbarContent className="hidden lg:flex" justify="center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "font-normal text-foreground hover:opacity-80 duration-150 data-[active=true]:text-primary data-[active=true]:font-semibold",
                )}
                data-active={pathname === item.href}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
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
              }),
            )}
          />
        </NavbarContent>
        <NavbarMenu className="gap-3">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "font-normal text-foreground hover:opacity-80 duration-150 data-[active=true]:text-primary data-[active=true]:font-semibold",
                )}
                data-active={pathname === item.href}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          <NavbarItem className="text-danger" onClick={auth.logout}>
            Logout
          </NavbarItem>
        </NavbarMenu>
      </NavbarContent>
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
