"use client";

import { Card, CardBody } from "@heroui/react";
import clsx from "clsx";
import React from "react";

import { CashReportType } from "@/types";
import { formatIDR } from "@/lib/utils";

type Props = {
  data: CashReportType;
  toggleActive?: () => void;
};

const ReportCard = ({ data, toggleActive }: Props) => {
  return (
    <Card
      fullWidth
      isHoverable
      className="hover:scale-[1.02]"
      onDoubleClick={toggleActive}
    >
      <CardBody className="flex-row items-center gap-1">
        <div className="flex-grow">
          <p className="line-clamp-1 text-sm">{data.label}</p>
        </div>
        <h5
          className={clsx(
            data.income ? "text-success" : "text-danger",
            "font-semibold min-w-max",
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
