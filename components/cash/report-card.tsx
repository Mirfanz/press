"use client";

import { formatIDR } from "@/lib/utils";
import { Card, CardBody } from "@heroui/react";
import clsx from "clsx";
import React from "react";

type Props = {
  data: {
    $id: string;
    time: Date;
    amount: number;
    income: boolean;
    label: string;
  };
};

const ReportCard = ({ data }: Props) => {
  return (
    <Card className="mb-2 hover:brightness-95 dark:hover:brightness-125 hover:scale-[1.02] !duration-150">
      <CardBody className="flex-row items-center gap-1">
        <div className="flex-grow">
          <p className="line-clamp-1 text-sm">{data.label}</p>
          <small className="text-foreground-500 text-xs">
            {data.time.toLocaleDateString()}
          </small>
        </div>
        <h5
          className={clsx(
            data.income ? "text-success" : "text-danger",
            "font-semibold min-w-max"
          )}
        >
          {data.income ? "+" : "-"}
          {formatIDR(data.amount)}
        </h5>
      </CardBody>
    </Card>
  );
};

export default ReportCard;
