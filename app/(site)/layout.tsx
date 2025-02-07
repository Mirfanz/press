"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";

import Loading from "./loading";

import { useAuth } from "@/components/auth-provider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadingUser, user } = useAuth();
  const router = useRouter();

  if (loadingUser) return <Loading />;
  else if (!user) return router.replace("/auth/login");

  return (
    <div className="px-3 lg:px-6 pt-3">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
