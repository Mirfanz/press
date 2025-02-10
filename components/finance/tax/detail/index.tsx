"use client";

import { Card, CardBody, User } from "@heroui/react";
import React from "react";

import { monthString } from "@/config/site";
import { TaxType } from "@/types";

type Props = {
  tax: TaxType<true>;
};

const TaxDetail = ({ tax }: Props) => {
  return (
    <section>
      <h2 className="text-center text-lg mb-6">
        Laporan Kas{" "}
        <span className="text-primary font-semibold">
          {monthString[tax.month - 1]} {tax.year}
        </span>
      </h2>

      <div className="flex flex-col gap-3">
        {tax.users.map((user) => (
          <Card key={"tax-user-" + user.$id} isHoverable isPressable>
            <CardBody>
              <User
                avatarProps={{
                  src: user.prefs.image_url || "/default-profile.png",
                }}
                className="justify-start"
                description={user.$id}
                name={user.name}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TaxDetail;
