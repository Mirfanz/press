"use client";

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadingUser, user } = useAuth();
  const router = useRouter();

  if (loadingUser) return <Loading />;
  else if (!user) return router.replace("/auth/login");
  return <div className="px-3 lg:px-6 pt-3">{children}</div>;
}
