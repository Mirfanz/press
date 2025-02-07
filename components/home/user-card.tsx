"use client";

import React, { useState } from "react";
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

import { useAuth } from "../auth-provider";

const UserCard = () => {
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
            <Button fullWidth className="" onPress={() => setDetailOpen(true)}>
              Detail
            </Button>
            <Button fullWidth className="">
              Edit
            </Button>
            <Button
              fullWidth
              color="danger"
              startContent={<LogOutIcon className="w-4 h-4" />}
              onPress={logout}
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
            <Avatar className="w-56 h-56 mx-auto" src="/default-profile.png" />
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
