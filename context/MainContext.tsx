"use client";
import { logout } from "@/services/auth";
import { getUserInfo } from "@/services/userInfo";
import React, { createContext, useEffect, useMemo, useState } from "react";

interface ContextReturnType {
  user: any;
  updateUserInfo: () => void;
  handleLogout: () => void;
  isLoggedIn: boolean;
}

interface MainContextPropsType {
  children: React.ReactNode;
}

interface MainContextState {
  user: any | undefined;
}
export const Context = createContext<ContextReturnType>(
  {} as ContextReturnType
);

const MainContext = (props: MainContextPropsType) => {
  const [state, setState] = useState<MainContextState>({ user: undefined });
  const { children } = props;

  const updateUserInfo = async () => {
    try {
      const res = await getUserInfo();
      setState((per) => ({ ...per, user: res.data.data }));
      console.log("User info response:", res.data.data);
    } catch (error) {
      console.log("User info response Erorr");
    }
  };

  const handleLogout = () => {
    logout().then(() => {
      setState((prevState) => ({ ...prevState, user: undefined }));
    });
  };

  const isLoggedIn = useMemo(() => {
    return !!state.user;
  }, [state.user]);

  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <Context.Provider
      value={{
        ...state,
        isLoggedIn,
        updateUserInfo,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;
