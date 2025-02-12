"use client";

import { Alert, AlertProps, Button, Card, CardBody, User } from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { UserType } from "@/types";
import { useAuth } from "@/components/auth-provider";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
  return (
    <Card
      className={clsx(
        "w-full ring-1 ring-inset",
        isPaid ? "ring-success order-2" : "ring-danger order-1",
        !isVisible && "hidden"
      )}
      isHoverable
      isPressable
    >
      <CardBody className="flex-row justify-between items-center">
        <User
          avatarProps={{
            src: user.prefs.image_url || "/default-profile.png",
          }}
          className="justify-start"
          description={user.$id}
          name={user.name}
        />
        {!isPaid && hasRole("bendahara") && (
          <Button
            isLoading={loading}
            className=""
            onPress={() => {
              Swal.fire({
                icon: "warning",
                text: `Konfirmasi ${user.name} (${user.$id}) sudah membayar kas`,
                showCancelButton: true,
                confirmButtonText: "Ya, Sudah",
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
            size="sm"
          >
            Konfirmasi
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default UserCard;
