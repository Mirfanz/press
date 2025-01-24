"use client";

import { account } from "@/lib/appwrite-client";
import { Button } from "@nextui-org/button";
import React from "react";

import { useAuth } from "./auth-provider";

type Props = {};

const Home = (props: Props) => {
  const { user, logout } = useAuth();
  return (
    <section>
      <p>{user?.name}</p>
      <p>{user?.$id}</p>
      <p>{user?.email}</p>
      <p>{user?.emailVerification}</p>
      <p>{user?.labels}</p>
      <Button
        variant="solid"
        color="primary"
        onPress={async () => {
          console.log(await logout());
        }}
      >
        Logout
      </Button>
    </section>
  );
};

export default Home;
