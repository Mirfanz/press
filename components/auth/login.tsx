"use client";

import { Alert, Button, Card, CardBody, Form, Input } from "@heroui/react";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { useAuth } from "../auth-provider";

import Loading from "@/app/auth/loading";

const Login = () => {
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

    auth.login(email, password).then((res) => {
      if (!res.success) {
        setIsError("Password atau Email salah");
        setIsLoading(false);
      }
    });
  };

  const { loadingUser, user } = useAuth();
  const router = useRouter();

  if (loadingUser) return <Loading />;
  else if (user) router.replace("/");
  else
    return (
      <Card className="max-w-full">
        <CardBody className="w-96 max-w-full p-6">
          <h1 className="text-4xl font-bold text-foreground text-center mb-6">
            PRESS II
          </h1>

          <Alert
            className="mb-3 animate-appearance-in"
            color="danger"
            description={isError ?? "Login Gagal"}
            isVisible={isError ? true : false}
            variant="bordered"
          />
          <Form onSubmit={handleFormLogin}>
            <Input
              name="email"
              placeholder="Email"
              startContent={<MailIcon />}
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
              // autoComplete="off"
            />
            <Input
              name="password"
              placeholder="Password"
              startContent={<KeyRoundIcon />}
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
            <Button
              fullWidth
              className="mt-2 mx-auto"
              color="warning"
              isLoading={isLoading}
              type="submit"
            >
              LOGIN
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
};

export default Login;
