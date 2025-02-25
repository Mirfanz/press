import { notFound } from "next/navigation";

import TaxDetail from "@/components/finance/tax/detail";
import { TaxType } from "@/types";
import { Suspense } from "react";

export default async function Page() {
  return <TaxDetail />;
}
