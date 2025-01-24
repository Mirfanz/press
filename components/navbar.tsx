"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles, button as buttonStyle } from "@nextui-org/theme";
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

export const Navbar = () => {
  const pathname = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" className="" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">PRESS II</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      {!pathname.startsWith("/auth") && (
        <NavbarContent justify="center" className="hidden sm:flex basis-3/5">
          <ul className="hidden lg:flex gap-4 justify-start">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "font-normal text-foreground hover:opacity-80 duration-150 data-[active=true]:text-primary data-[active=true]:font-semibold"
                  )}
                  data-active={pathname === item.href}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
      )}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        {!pathname.startsWith("/auth") && (
          <NavbarItem className="hidden md:flex">
            <Button
              className="text-sm font-normal text-default-600 bg-default-100"
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1" justify="end">
        <ThemeSwitch className="me-2" />
        {!pathname.startsWith("/auth") && (
          <NavbarMenuToggle
            className={clsx(
              buttonStyle({
                variant: "faded",
                isIconOnly: true,
                radius: "sm",
              })
            )}
          />
        )}
      </NavbarContent>

      {!pathname.startsWith("/auth") && (
        <NavbarMenu>
          {/* {searchInput} */}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={"foreground"}
                  href="#"
                  size="lg"
                  className="data-[active=true]:text-primary data-[active=true]:font-semibold"
                  data-active={pathname === item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      )}
    </NextUINavbar>
  );
};
