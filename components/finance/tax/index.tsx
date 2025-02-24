"use client";

import { Card, CardBody, Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsUpDownIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

import { TaxType } from "@/types";
import { monthString } from "@/config/site";
import Loading from "@/app/loading";
import Header from "@/components/header";

type Props = {};

const Tax = (props: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tax-data"],
    queryFn: async (): Promise<TaxType[]> => {
      const response = await axios.get("/api/finance/tax");

      return response.data.data;
    },
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (isLoading) return <Loading />;
  else
    return (
      <section>
        <Header
          title="Kas Bulanan"
          icon={<WalletIcon className="h-5 w-5 md:w-6 md:h-6" />}
          endContent={
            <Select
              disableSelectorIconRotation
              className="w-20"
              selectorIcon={<ChevronsUpDownIcon className="w-4 h-4" />}
              size="sm"
            >
              <SelectItem hideSelectedIcon className="text-center">
                2025
              </SelectItem>
              <SelectItem hideSelectedIcon className="text-center">
                2026
              </SelectItem>
            </Select>
          }
        />

        <div className="flex flex-col gap-3">
          {data?.map((tax) => (
            <Card
              key={"tax-" + tax.$id}
              fullWidth
              isHoverable
              isPressable
              as={Link}
              href={`/finance/tax/${tax.year}/${tax.month}`}
            >
              <CardBody className="">
                <h3 className="me-auto font-semibold text-primary text-lg mb-1">
                  {monthString[tax.month - 1]}
                </h3>

                <div className="">
                  <p className="text-sm text-foreground-500">
                    {tax.users.length
                      ? tax.users.length + " member belum bayar"
                      : "Semua member sudah bayar kas bulan ini"}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    );
};

export default Tax;
