import { Suspense } from "react";

import Loading from "../loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center w-full h-full px-4">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
