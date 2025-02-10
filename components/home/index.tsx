"use client";

import { Alert, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ReportCard from "../finance/report-card";

import UserCard from "./user-card";

import { FinanceReportType } from "@/types";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["finane-report"],
    queryFn: async (): Promise<FinanceReportType[]> => {
      const response = await axios.get("/api/finance/report");

      return response.data.data.slice(0, 3);
    },
  });

  return (
    <main>
      <UserCard />
      <section className="mt-5">
        <Alert
          hideIconWrapper
          isClosable
          className="mb-3"
          description="Bayar apa mau dipecat?"
          variant="faded"
          color="warning"
          // description="Bayar kalau gamau dipecatt"
          title="Belum Bayar Kas"
        />
        <div className="flex items-center justify-between mb-3 mx-1">
          <h5 className="font-semibold">Laporan Keuangan</h5>
          <Link href="/finance" size="sm">
            Lainnya
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {data?.map((item) => (
            <ReportCard key={"home-" + item.$id} data={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
