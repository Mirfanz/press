"use client";

import { Alert, Button, Card, CardBody } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";
import Swal from "sweetalert2";

import Loading from "../loading";
import { useAuth } from "../auth-provider";

import AddReport from "./add-report";
import ReportCard from "./report-card";

import { FinanceReportType } from "@/types";
import { compareMonth, formatDate, formatIDR } from "@/lib/utils";
import Header from "../header";

let lastDate = new Date();

const Cash = () => {
  const { hasRole } = useAuth();

  const [activeReport, setActiveReport] = useState<string>();
  const [modalAddReportOpen, setModalAddReportOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["finance-report"],
    queryFn: async (): Promise<FinanceReportType[]> => {
      const response = await axios.get("/api/finance/report");

      return response.data.data;
    },
  });

  const deleteReport = (item: FinanceReportType) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/finance/report", {
            data: { id: item.$id },
          })
          .then(() => {
            refetch();
          });
      }
    });
  };

  useEffect(() => {
    let total = 0;

    data?.map((item) =>
      item.income ? (total += item.amount) : (total -= item.amount)
    );
    setBalance(total);
  }, [data]);

  return (
    <main>
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardBody className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-lg">Sisa Saldo</h2>
          <p className="text-2xl font-bold">Rp {formatIDR(balance)}</p>
        </CardBody>
      </Card>

      <section className="mt-6">
        <Header
          title="Laporan Keuangan"
          endContent={
            hasRole("bendahara") ? (
              <Button size="sm" onPress={() => setModalAddReportOpen(true)}>
                <PlusIcon className="w-4 h-4" /> Tambah
              </Button>
            ) : (
              <Button
                isDisabled
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
              >
                <AlertCircle className="w-4 h-4" />
              </Button>
            )
          }
        />

        {isLoading ? (
          <Loading />
        ) : error ? (
          <Alert
            color="danger"
            description="Gagal mengambil data laporan keuangan, muat ulang halaman ini."
            title="Terjadi Kesalahan"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {data?.map((item, index) => {
              const currentDate = new Date(item.date);
              const showDate =
                compareMonth(currentDate, lastDate) == "older" || index == 0;

              lastDate = currentDate;

              return (
                <>
                  {showDate && (
                    <h5
                      className={clsx(
                        "text-sm font-medium",
                        index > 0 && "mt-3"
                      )}
                    >
                      {formatDate(currentDate)}
                    </h5>
                  )}
                  <div className="flex items-center gap-3">
                    <ReportCard
                      key={"finance-" + item.$id}
                      data={item}
                      toggleActive={() =>
                        setActiveReport((prev) =>
                          prev == item.$id ? undefined : item.$id
                        )
                      }
                    />
                    {activeReport == item.$id && hasRole("bendahara") && (
                      <Button
                        isIconOnly
                        className="animate-appearance-in"
                        color="danger"
                        size="sm"
                        variant="shadow"
                        onPress={() => deleteReport(item)}
                      >
                        <Trash2Icon className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        )}
      </section>
      {hasRole("bendahara") && (
        <AddReport
          isOpen={modalAddReportOpen}
          refetch={() => refetch()}
          onClose={() => setModalAddReportOpen(false)}
        />
      )}
    </main>
  );
};

export default Cash;
