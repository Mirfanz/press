"use client";

import { account } from "@/lib/appwrite-client";
import { Button, Card, CardBody, Form, Input } from "@nextui-org/react";
import axios from "axios";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const Login = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, setFields] = React.useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = fields;

    if (!email || !password) return setIsLoading(false);

    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        console.log("res", res);
        if (res.data.success) {
          alert("Login Success");
          router.replace(
            decodeURIComponent(searchParams.get("redirect_url") || "/")
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Login Gagal");
        setIsLoading(false);
      });
  };
  return (
    <Card className="max-w-full">
      <CardBody className="w-96 max-w-full p-6">
        <h1 className="text-4xl font-bold text-foreground text-center mb-6">
          PRESS II
        </h1>
        <Form onSubmit={handleFormLogin}>
          <Input
            type="email"
            placeholder="Email"
            startContent={<MailIcon />}
            isRequired
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
            // autoComplete="off"
          />
          <Input
            type="password"
            placeholder="Password"
            startContent={<KeyRoundIcon />}
            isRequired
            name="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            className="mt-2"
          >
            LOGIN
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
