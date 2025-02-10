import { notFound } from "next/navigation";

import TaxDetail from "@/components/finance/tax/detail";
import { TaxType } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ taxID: string }>;
}) {
  const { taxID } = await params;
  const result: { success: boolean; data: TaxType<true> } = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/finance/tax/${taxID}`,
  ).then((resp) => resp.json());

  if (!result.success) return notFound();

  return <TaxDetail tax={result.data} />;
}
