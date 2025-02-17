"use client";

import { Button } from "@heroui/button";
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
      href: "#",
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
          className="justify-start"
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
