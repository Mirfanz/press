"use client";

import { Card, CardBody, Spinner } from "@heroui/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      <Card className="m-auto animate-pulse">
        <CardBody className="flex-row gap-4 items-center">
          <Spinner />
          <p className="">Loading . . .</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;
