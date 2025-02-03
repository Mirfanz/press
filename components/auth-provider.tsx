"use client";

import { account } from "@/lib/appwrite-client";
import { isProtected } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Spinner,
  useModal,
} from "@heroui/react";
import { Models } from "appwrite";
import axios, { AxiosResponse } from "axios";
import { XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  user?: Models.User<Models.Preferences>;
  logout: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  loadingUser: boolean;
  loadingLogin: boolean;
  loadingLogout: boolean;
} | null>(null);

export const AuthProvider = ({
  children,
  authProps,
}: {
  children: ReactNode;
  authProps: { session?: string };
}) => {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const [logoutModalOpen, setLogOutModalOpen] = useState(false);

  const login = async (email: string, password: string) => {
    setLoadingLogin(true);
    return account
      .createEmailPasswordSession(email, password)
      .then(async (res) => {
        console.log("Login Success", res);
        setUser(await account.get());

        return { success: true, message: "Login Success" };
      })
      .catch((err) => {
        console.log("Login Gagal", err.message);
        return { success: false, message: "Login Failed" };
      })
      .finally(() => setLoadingLogin(false));
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    setLogOutModalOpen(false);
    return account
      .deleteSession("current")
      .then(() => {
        setUser(undefined);
        return { success: true, message: "Logout Success" };
      })
      .catch((err) => {
        return { success: false, message: "Logout Failed" };
      })
      .finally(() => setLoadingLogout(false));
  };

  const logout = () => {
    setLogOutModalOpen(true);
  };

  useEffect(() => {
    console.log("UseEffect 1");

    account
      .get()
      .then((res) => {
        setUser(res);
        console.log("Sudah Login", res);
      })
      .catch((err) => {
        setUser(undefined);
        console.log("Belum Login", err);
      })
      .finally(() => setLoadingUser(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        loadingUser,
        loadingLogin,
        loadingLogout,
      }}
    >
      {children}
      <Modal
        isOpen={logoutModalOpen}
        placement="center"
        onClose={() => setLogOutModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Mau Logout?</ModalHeader>
          <ModalBody>Anda akan keluar dari akun ini</ModalBody>
          <ModalFooter>
            <Button
              isLoading={loadingLogout}
              onPress={handleLogout}
              color="danger"
            >
              Logout
            </Button>
            <Button
              disabled={loadingLogout}
              onPress={() => setLogOutModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContenxt = useContext(AuthContext);
  if (!authContenxt)
    throw new Error("useAuth must be used within an AuthProvider");
  return authContenxt;
};
