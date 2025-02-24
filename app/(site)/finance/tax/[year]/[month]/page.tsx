import { notFound } from "next/navigation";

import TaxDetail from "@/components/finance/tax/detail";
import { TaxType } from "@/types";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const result: { success: boolean; data: TaxType<true> } = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/finance/tax/${year}/${month}`
  ).then((resp) => resp.json());

  if (!result.success) return notFound();

  return <TaxDetail tax={result.data} />;
}
