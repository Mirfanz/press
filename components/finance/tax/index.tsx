"use client";

import { Card, CardBody, Chip, Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsUpDownIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

import { TaxType } from "@/types";
import { monthString } from "@/config/site";
import Loading from "@/app/loading";

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg ms-1 font-semibold">Kas Bulanan</h2>
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
        </div>
        <div className="flex flex-col gap-3">
          {data?.map((tax) => (
            <Card
              key={"tax-" + tax.$id}
              fullWidth
              isHoverable
              isPressable
              as={Link}
              href={`/finance/tax/${tax.$id}`}
            >
              <CardBody className="flex-row items-center">
                <p className="me-auto">
                  {monthString[parseInt(tax.$id.split(".")[1]) - 1]}
                </p>
                <Chip
                  color="success"
                  size="sm"
                  startContent={
                    <UsersRoundIcon className="w-3 h-3 me-1 ms-2" />
                  }
                  variant="flat"
                >
                  {tax.users.length}
                </Chip>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    );
};

export default Tax;
