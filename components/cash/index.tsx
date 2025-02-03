"use client";

import { formatIDR } from "@/lib/utils";
import { Card, CardBody, Link, Select, SelectItem } from "@heroui/react";
import ReportCard from "./report-card";

type Props = {};

const Cash = (props: Props) => {
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
    {
      $id: "4",
      time: new Date(),
      amount: 200000,
      income: true,
      label: "Penjualan Barang",
    },
    {
      $id: "5",
      time: new Date(),
      amount: 150000,
      income: false,
      label: "Pembelian Alat Tulis",
    },
    {
      $id: "6",
      time: new Date(),
      amount: 500000,
      income: true,
      label: "Pendapatan Proyek",
    },
    {
      $id: "7",
      time: new Date(),
      amount: 250000,
      income: false,
      label: "Pembelian Buku",
    },
    {
      $id: "8",
      time: new Date(),
      amount: 300000,
      income: true,
      label: "Penjualan Produk",
    },
    {
      $id: "9",
      time: new Date(),
      amount: 450000,
      income: false,
      label: "Pembayaran Listrik",
    },
    {
      $id: "10",
      time: new Date(),
      amount: 600000,
      income: true,
      label: "Pendapatan Konsultasi",
    },
    {
      $id: "11",
      time: new Date(),
      amount: 100000,
      income: false,
      label: "Pembelian Kopi",
    },
    {
      $id: "12",
      time: new Date(),
      amount: 750000,
      income: true,
      label: "Penjualan Software",
    },
  ];
  return (
    <main>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardBody className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-lg">Sisa Saldo</h2>
          <p className="text-2xl font-bold">Rp {formatIDR(33005000)}</p>
        </CardBody>
      </Card>
      <section className="mt-5">
        <div className="flex items-center justify-between mb-3 mx-1">
          <h5 className="font-semibold">Laporan Keuangan</h5>
          <Select className="w-28" size="sm" placeholder="Filter">
            <SelectItem isSelected>Semua</SelectItem>
            <SelectItem>Bulan Ini</SelectItem>
            <SelectItem>7 Hari</SelectItem>
            <SelectItem>30 Hari</SelectItem>
          </Select>
        </div>

        {fakeReport.map((item) => (
          <ReportCard data={item} key={item.$id} />
        ))}
      </section>
    </main>
  );
};

export default Cash;
