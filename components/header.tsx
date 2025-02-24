"use client";

import React from "react";

type Props = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  endContent?: React.ReactNode;
};

const Header = ({ icon, title, endContent }: Props) => {
  return (
    <div className="flex justify-between items-center mb-6 lg:mt-4">
      <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
        {icon} {title}
      </h1>
      <div className="">{endContent}</div>
    </div>
  );
};

export default Header;
