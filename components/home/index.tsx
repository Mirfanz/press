"use client";

import { Button } from "@heroui/button";
import UserCard from "./user-card";
import { Alert, Card, CardBody, Link } from "@heroui/react";
import clsx from "clsx";
import { formatIDR } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import NextLink from "next/link";
import ReportCard from "../cash/report-card";
const Home = () => {
  const fakeReport = [
    {
      $id: "1",
      time: new Date(),
      amount: 115000,
      income: false,
      label: "Beli Gembok",
    },
    {
      $id: "2",
      time: new Date(),
      amount: 400000,
      income: true,
      label: "Kas Bulan Februari",
    },
    {
      $id: "3",
      time: new Date(),
      amount: 350000,
      income: false,
      label: "Membeli obat-obatan",
    },
  ];

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
          title="Belum Bayar Kas"
          description="Bayar kalau gamau dipecatt"
          color="danger"
          variant="faded"
          className="mb-2"
        />
        {fakeReport.map((item) => (
          <ReportCard data={item} key={item.$id} />
        ))}
      </section>
    </main>
  );
};

export default Home;
