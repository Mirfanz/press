"use client";

import { Alert, Button, Card, CardBody, Form, Input } from "@heroui/react";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useAuth } from "../auth-provider";

type Props = {};

const Login = (props: Props) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState<string | null>(null);

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
    setIsError(null);
    const { email, password } = fields;

    if (!email || !password) {
      setTimeout(() => {
        setIsError("Email dan Password wajib diisi");
        setIsLoading(false);
      }, 250);
      return;
    }

    auth
      .login(email, password)
      .then((res) => {})
      .catch((err) => {
        setIsError("Password atau Email salah");
        setIsLoading(false);
      });
  };
  return (
    <Card className="max-w-full">
      <CardBody className="w-96 max-w-full p-6">
        <h1 className="text-4xl font-bold text-foreground text-center mb-6">
          PRESS II
        </h1>

        <Alert
          variant="bordered"
          color="danger"
          className="mb-3 animate-appearance-in"
          isVisible={isError ? true : false}
          description={isError ?? "Login Gagal"}
        />
        <Form onSubmit={handleFormLogin}>
          <Input
            type="email"
            placeholder="Email"
            startContent={<MailIcon />}
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
            // autoComplete="off"
          />
          <Input
            type="password"
            placeholder="Password"
            startContent={<KeyRoundIcon />}
            name="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            className="mt-2 mx-auto"
            color="warning"
          >
            LOGIN
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
