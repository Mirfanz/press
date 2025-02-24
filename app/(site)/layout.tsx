"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

import Loading from "./loading";

import { useAuth } from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import { SideBarContent } from "@/components/sidebar";
import { siteConfig } from "@/config/site";

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
    <div className="relative flex flex-col h-dvh">
      <div className="flex flex-grow">
        <div className="min-w-64 w-64 bg-slate-100 dark:bg-slate-900 hidden md:block sticky top-0 h-dvh overflow-hidden">
          <Link className="flex items-center gap-1 m-4" href="/">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h2 className="font-bold text-inherit">PRESS II</h2>
          </Link>
          <div className="h-max px-2 overflow-y-auto">
            <SideBarContent />
          </div>
          <Link
            className="absolute bottom-1 right-2 text-sm text-foreground-500"
            href={siteConfig.links.instagram}
          >
            @mirfanz_
          </Link>
        </div>
        <div className="flex-grow relative">
          <Navbar fullContent />
          <div className="px-3 md:px-6 pt-3 mb-4">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
