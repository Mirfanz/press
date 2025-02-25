"use client";

import { Badge, Button, Card, CardBody, User } from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useAuth } from "@/components/auth-provider";
import { UserType } from "@/types";

type Props = {
  user: UserType;
  isPaid?: boolean;
  isVisible?: boolean;
  taxId: string;
};

const UserCard = ({
  user,
  isVisible = false,
  isPaid: ispaid,
  taxId,
}: Props) => {
  const [isPaid, setIsPaid] = useState(ispaid);
  const { hasRole } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsPaid(ispaid);
  }, [ispaid]);

  if (!isVisible) return;
  return (
    <Badge
      content={"Sudah Lunas"}
      isInvisible={!isPaid}
      className="right-11"
      size="sm"
    >
      <Card
        isHoverable
        isPressable
        fullWidth
        className={clsx(isPaid && "order-1")}
      >
        <CardBody className="flex-row justify-between items-center">
          <User
            avatarProps={{
              src: user.prefs.image_url || "/default-profile.png",
            }}
            className={clsx("justify-start")}
            description={user.$id}
            name={user.name}
          />
          {!isPaid && hasRole("bendahara") && (
            <Button
              className=""
              isLoading={loading}
              size="sm"
              color="primary"
              onPress={() => {
                Swal.fire({
                  icon: "warning",
                  text: `Konfirmasi ${user.name} (${user.$id}) sudah membayar kas`,
                  showCancelButton: true,
                  confirmButtonText: "Ya, Lanjut",
                  cancelButtonText: "Batal",
                }).then((resp) => {
                  if (!resp.isConfirmed) return;
                  setLoading(true);
                  axios
                    .post("/api/finance/tax", {
                      taxId,
                      userId: user.$id,
                    })
                    .then((resp) => {
                      console.log("resp", resp);
                      if (resp.data.success) setIsPaid(true);
                    })
                    .finally(() => setLoading(false));
                });
              }}
            >
              Lunas
            </Button>
          )}
        </CardBody>
      </Card>
    </Badge>
  );
};

export default UserCard;
