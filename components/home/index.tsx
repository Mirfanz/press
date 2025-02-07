"use client";

import { Alert, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ReportCard from "../cash/report-card";

import UserCard from "./user-card";

import { CashReportType } from "@/types";
const Home = () => {
  const { data } = useQuery({
    queryKey: ["get-cash-resport-home"],
    queryFn: async (): Promise<CashReportType[]> => {
      const response = await axios.get("/api/cash/report");

      return response.data.data.slice(0, 3);
    },
  });

  return (
    <main>
      <UserCard />
      <section className="mt-5">
        <div className="flex items-center justify-between mb-3 mx-1">
          <h5 className="font-semibold">Laporan Keuangan</h5>
          <Link href="/cash" size="sm">
            Lainnya
          </Link>
        </div>
        <Alert
          className="mb-3"
          color="danger"
          description="Bayar kalau gamau dipecatt"
          title="Belum Bayar Kas"
          variant="faded"
        />
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
