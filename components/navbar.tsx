"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles, button as buttonStyle } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";

export const Navbar = () => {
  const pathname = usePathname();
  const auth = useAuth();
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-1">
            <Logo />
            <h2 className="font-bold text-inherit">PRESS II</h2>
          </NextLink>
        </NavbarBrand>
        <NavbarContent justify="center" className="hidden lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  "font-normal text-foreground hover:opacity-80 duration-150 data-[active=true]:text-primary data-[active=true]:font-semibold"
                )}
                data-active={pathname === item.href}
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
              })
            )}
          />
        </NavbarContent>
        <NavbarMenu className="gap-3">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  "font-normal text-foreground hover:opacity-80 duration-150 data-[active=true]:text-primary data-[active=true]:font-semibold"
                )}
                data-active={pathname === item.href}
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

export const AuthNavbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-1">
            <Logo />
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
