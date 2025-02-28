"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
} from "@heroui/react";
import {
  LogOutIcon,
  MailIcon,
  PhoneCallIcon,
  PhoneIcon,
  ShieldAlert,
  ShieldAlertIcon,
  ShieldCheckIcon,
  User2Icon,
  UserCircle2Icon,
} from "lucide-react";

import { useAuth } from "../auth-provider";

const UserCard = () => {
  const { user, logout } = useAuth();
  const [detailOpen, setDetailOpen] = useState(true);

  return (
    <>
      <Card fullWidth>
        <CardBody>
          <div className="flex gap-3">
            <div className="h-36 aspect-square">
              <Avatar
                alt="User Profile"
                radius="md"
                className="w-full h-full"
                src={user?.prefs.image_url || "/default-profile.png"}
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <h5 className="text-base font-semibold">{user?.name}</h5>
              <div className="flex flex-col gap-1">
                <p className="flex items-center text-foreground-600">
                  <MailIcon className="w-4 h-4 me-2" />
                  <small>{user?.email}</small>
                </p>
                <p className="flex items-center text-foreground-600">
                  <UserCircle2Icon className="w-4 h-4 me-2" />
                  <small> {user?.$id}</small>
                </p>
                <p className="flex items-center text-foreground-600">
                  <PhoneCallIcon className="w-4 h-4 me-2" />
                  <small> {user?.phone || <i>Tidak Ada</i>}</small>
                </p>
                <p className="flex items-center text-foreground-600">
                  <ShieldCheckIcon className="w-4 h-4 me-2" />
                  <small> {user?.labels.join(",")}</small>
                </p>
              </div>
            </div>
          </div>

          {detailOpen && (
            <div className="mt-3 flex flex-col gap-2">
              <Button fullWidth className="">
                Ganti Foto
              </Button>
              <Button fullWidth className="">
                Ganti Password
              </Button>
              <Button
                onPress={logout}
                fullWidth
                color="danger"
                variant="faded"
                className=""
              >
                Keluar
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={false} onClose={() => setDetailOpen(false)}>
        <ModalContent>
          <ModalHeader>Informasi Akun</ModalHeader>
          <Divider />
          <ModalBody className="py-4">
            <Avatar
              className="w-56 h-56 mx-auto"
              src={user?.prefs.image_url || "/default-profile.png"}
            />
            <div className="flex">
              <p className="w-20">Nama</p>
              <p>: {user?.name}</p>
            </div>
            <div className="flex">
              <p className="w-20">Role</p>
              <p>
                :{" "}
                {user?.labels.map((label) => (
                  <Chip key={"user-label-" + label} className="me-1">
                    {label}
                  </Chip>
                ))}
              </p>
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
