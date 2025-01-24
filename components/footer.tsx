"use client";

import { Link } from "@nextui-org/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/mirfanz"
        title="Github Mirfanz"
      >
        <span className="text-default-600">
          <i>copyright &copy; 2025 by</i>
        </span>
        <p className="text-primary">Mirfanz</p>
      </Link>
    </footer>
  );
};

export default Footer;
