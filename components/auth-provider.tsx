"use client";

import { account } from "@/lib/appwrite-client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useModal,
} from "@heroui/react";
import { Models } from "appwrite";
import axios, { AxiosResponse } from "axios";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { title } from "process";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";

const AuthContext = createContext<{
  user?: Models.User<Models.Preferences>;
  logout: () => void;
  login: (email: string, password: string) => Promise<AxiosResponse<any, any>>;
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
  const [logoutModalOpen, setLogOutModalOpen] = useState(false);
  const [logoutLoading, setLogOutLoading] = useState(false);

  useEffect(() => {
    if (authProps.session) {
      account.client.setSession(authProps.session);
      account.get().then((resp) => {
        setUser(resp);
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // const result = await account.createEmailPasswordSession(email, password);
    // console.log("result", result.secret);
    return axios.post("/api/auth/login", { email, password }).then((res) => {
      router.replace("/");
      return res;
    });
  };

  const handleLogout = async () => {
    setLogOutLoading(true);
    setLogOutModalOpen(false);
    axios
      .post("/api/auth/logout")
      .then(() => {
        router.refresh();
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => setLogOutLoading(false));
  };

  const logout = () => {
    setLogOutModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
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
              isLoading={logoutLoading}
              onPress={handleLogout}
              color="danger"
            >
              Logout
            </Button>
            <Button
              disabled={logoutLoading}
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
