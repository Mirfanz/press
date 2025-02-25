"use client";

import { Card, CardBody, Input, Spinner } from "@heroui/react";
import React, { useState } from "react";
import { SearchIcon, UserCheckIcon } from "lucide-react";

import UserCard from "./user-card";

import { monthString } from "@/config/site";
import { TaxType, UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound, useParams } from "next/navigation";
import Loading from "@/app/(site)/loading";

const TaxDetail = () => {
  const [search, setSearch] = useState<string>();
  const { year, month } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tax-" + year + "-" + month],
    queryFn: async () => {
      const result = await axios.get(`/api/finance/tax/${year}/${month}`);
      if (!result.data.success) notFound();
      return result.data.data as TaxType<true>;
    },
  });
  // if (isLoading) return <Loading />;
  if (isError) return notFound();
  return (
    <section className="overflow-visible">
      <h2 className="text-center text-lg mb-6">
        Laporan Kas{" "}
        <span className="text-primary font-semibold">
          {monthString[parseInt(month as string) - 1]} {year}
        </span>
      </h2>

      <div className="flex mb-6 gap-2 md:gap-4">
        <Card fullWidth>
          <CardBody className="items-center gap-2 p-4">
            <p className="text-4xl text-success font-semibold">
              {isLoading && <Spinner />}
              {data?.paidUsers.length}
            </p>
            <p className="">Sudah Bayar</p>
          </CardBody>
        </Card>
        <Card fullWidth>
          <CardBody className="items-center gap-2 p-4">
            <p className="text-4xl text-danger font-semibold">
              {isLoading && <Spinner />}
              {data?.users.length}
            </p>
            <p className="">Belum Bayar</p>
          </CardBody>
        </Card>
      </div>

      <Input
        className="mb-6"
        color="primary"
        endContent={<SearchIcon className="w-5 h-5 me-1ss" />}
        placeholder="Pencarian "
        size="lg"
        type="search"
        value={search}
        variant="faded"
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 h-full overflow-visible">
        {data?.users.map((user: UserType) => (
          <UserCard
            key={"users-" + user.$id}
            isVisible={
              search
                ? user.name.toLowerCase().includes(search.toLowerCase())
                : true
            }
            taxId={data.$id}
            user={user}
          />
        ))}
        {data?.paidUsers.map((user: UserType) => (
          <UserCard
            key={"users-" + user.$id}
            isPaid
            isVisible={
              search
                ? user.name.toLowerCase().includes(search.toLowerCase())
                : true
            }
            taxId={data.$id}
            user={user}
          />
        ))}
      </div>
    </section>
  );
};

export default TaxDetail;
