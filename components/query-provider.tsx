"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

import queryClient from "@/lib/queryClient";

type Props = {
  children: ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
