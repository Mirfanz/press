"use client";
import { Card, CardBody, Spinner } from "@heroui/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Card isBlurred className="mx-auto my-4 animate-pulse">
        <CardBody className="flex-row gap-4 items-center">
          <Spinner />
          {/* <p className="">Loading . . .</p> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;
