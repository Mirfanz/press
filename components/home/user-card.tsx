"use client";

import React, { useState } from "react";
import { useAuth } from "../auth-provider";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
} from "@heroui/react";
import { LogOutIcon } from "lucide-react";

type Props = {};

const UserCard = (props: Props) => {
  const { user, logout } = useAuth();
  const [detailOpen, setDetailOpen] = useState(false);
  return (
    <>
      <Card>
        <CardBody>
          {user ? (
            <div className="flex items-center space-x-4">
              <Avatar
                alt="User Profile"
                className="w-16 h-16"
                src={"/default-profile.png"}
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-foreground-500">{user.$id}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div>
                <Skeleton className="w-48 h-6 mb-2" />
                <Skeleton className="w-36 h-4" />
              </div>
            </div>
          )}
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button className="" fullWidth onPress={() => setDetailOpen(true)}>
              Detail
            </Button>
            <Button className="" fullWidth>
              Edit
            </Button>
            <Button
              fullWidth
              startContent={<LogOutIcon className="w-4 h-4" />}
              onPress={logout}
              color="danger"
            >
              Keluar
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)}>
        <ModalContent>
          <ModalHeader>Informasi Akun</ModalHeader>
          <Divider />
          <ModalBody className="py-4">
            <Avatar
              src="/default-profile.png"
              className="w-56 h-56 mx-auto"
              // radius="md"
            />
            <div className="flex">
              <p className="w-20">Nama</p>
              <p>: {user?.name}</p>
            </div>
            <div className="flex">
              <p className="w-20">Email</p>
              <p>: {user?.email}</p>
            </div>
            <div className="flex">
              <p className="w-20">Nik</p>
              <p>: {user?.$id}</p>
            </div>
            <div className="flex">
              <p className="w-20">Section</p>
              <p>: {"Forging Press 2"}</p>
            </div>
            <div className="flex">
              <p className="w-20">Tgl Lahir</p>
              <p>: {new Date(user?.$createdAt || "").toDateString()}</p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCard;
