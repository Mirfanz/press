"use client";

import { Input } from "@heroui/react";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

import UserCard from "./user-card";

import { monthString } from "@/config/site";
import { TaxType, UserType } from "@/types";

type Props = {
  tax: TaxType<true>;
};

const TaxDetail = ({ tax }: Props) => {
  const [search, setSearch] = useState<string>();

  return (
    <section className="overflow-visible">
      <h2 className="text-center text-lg mb-6">
        Laporan Kas{" "}
        <span className="text-primary font-semibold">
          {monthString[tax.month - 1]} {tax.year}
        </span>
      </h2>

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
      <div className="flex flex-col gap-3 h-full overflow-auto">
        {tax.users.map((user: UserType) => (
          <UserCard
            key={"users-" + user.$id}
            isVisible={
              search
                ? user.name.toLowerCase().includes(search.toLowerCase())
                : true
            }
            taxId={tax.$id}
            user={user}
          />
        ))}
        {tax.paidUsers.map((user: UserType) => (
          <UserCard
            key={"users-" + user.$id}
            isPaid
            isVisible={
              search
                ? user.name.toLowerCase().includes(search.toLowerCase())
                : true
            }
            taxId={tax.$id}
            user={user}
          />
        ))}
      </div>
    </section>
  );
};

export default TaxDetail;
