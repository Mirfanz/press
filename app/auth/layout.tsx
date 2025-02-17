import { Suspense } from "react";

import Loading from "../loading";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-dvh">
      <Navbar />
      <div className="container mx-auto max-w-7xl flex-grow">
        <div className="flex justify-center items-center w-full h-full px-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
