"use client";

import { Button, Link as HeroLink } from "@heroui/react";
import {
  BadgeDollarSignIcon,
  CalendarClockIcon,
  CodeSquareIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  NewspaperIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useAuth } from "./auth-provider";
import clsx from "clsx";

export const SideBarContent = () => {
  const pathname = usePathname();
  const auth = useAuth();
  const navItems = [
    {
      icon: <LayoutDashboardIcon className="w-4 h-4" />,
      label: "Beranda",
      href: "/",
    },
    {
      icon: <BadgeDollarSignIcon className="w-4 h-4" />,
      label: "Laporan Keuangan",
      href: "/finance",
    },
    {
      icon: <CalendarClockIcon className="w-4 h-4" />,
      label: "Jadwal Kerja",
      href: "/schedule",
    },
    {
      icon: <CodeSquareIcon className="w-4 h-4" />,
      label: "Kas Bulanan",
      href: "/finance/tax",
    },
    {
      icon: <NewspaperIcon className="w-4 h-4" />,
      label: "Informasi",
      href: "/news",
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {navItems.map((i) => (
        <Button
          key={"nav-item-" + i.href}
          as={Link}
          className={clsx(
            "justify-start rounded-none",
            pathname == i.href ? "border-l-2 border-solid border-primary" : ""
          )}
          href={i.href}
          startContent={i.icon}
          variant={pathname == i.href ? "flat" : "light"}
        >
          {i.label}
        </Button>
      ))}
      <Button
        className="justify-start"
        color="danger"
        startContent={<LogOutIcon className="w-4 h-4" />}
        variant={"light"}
        onPress={auth.logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default SideBarContent;
