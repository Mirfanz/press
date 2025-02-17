"use client";

import { useTheme } from "next-themes";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { Button } from "@heroui/button";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <>
      <Button
        className="hidden lg:flex capitalize"
        radius="full"
        size="sm"
        variant="flat"
        onPress={onChange}
      >
        {theme == "dark" ? (
          <MoonStarIcon className="w-4 h-4" />
        ) : (
          <SunIcon className="w-4 h-4" />
        )}
        {theme}
      </Button>

      <Button
        isIconOnly
        className="lg:hidden"
        radius="full"
        variant="light"
        onPress={onChange}
      >
        {theme == "dark" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonStarIcon className="w-5 h-5" />
        )}
      </Button>
    </>
  );
};
