"use client";

import { account } from "@/lib/appwrite-client";
import { Models } from "appwrite";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  user?: Models.User<Models.Preferences>;
  logout: () => Promise<boolean>;
} | null>(null);

export const AuthProvider = ({
  children,
  authProps,
}: {
  children: ReactNode;
  authProps: { session?: string };
}) => {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    if (authProps.session) {
      account.client.setSession(authProps.session);
      account.get().then((resp) => {
        setUser(resp);
      });
    }
  }, []);

  const logout = async () => {
    return axios
      .post("/api/auth/logout")
      .then(() => true)
      .catch(() => false);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContenxt = useContext(AuthContext);
  if (!authContenxt)
    throw new Error("useAuth must be used within an AuthProvider");
  return authContenxt;
};
