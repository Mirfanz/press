"use client";

import { Alert, AlertProps, User } from "@heroui/react";
import clsx from "clsx";
import React from "react";

import { UserType } from "@/types";

type Props = {
  user: UserType;
} & AlertProps;

const UserCard = ({ user, isVisible, color }: Props) => {
  return (
    <Alert
      hideIcon
      className={clsx("px-2", user.status ? "order-2" : "order-1")}
      color={color}
      isVisible={isVisible}
      variant="faded"
    >
      <User
        avatarProps={{
          src: user.prefs.image_url || "/default-profile.png",
        }}
        className="justify-start"
        description={user.$id}
        name={user.name}
      />
    </Alert>
  );
};

export default UserCard;
