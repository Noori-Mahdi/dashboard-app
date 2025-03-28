"use client";
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { checkTokenReady, login, register } from "@/services/auth";
import { Context } from "@/context/MainContext";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

interface AuthFormFormPropsType {
  type: "login" | "register" | null;
  changeMode: (e: "login" | "register" | null) => void;
}

interface LoginformDetaType {
  email: string;
  password: string;
}

interface RegisterformDetaType {
  userName: string;
  email: string;
  password: string;
}

const AuthForm = ({ type, changeMode }: AuthFormFormPropsType) => {
  const [formData, setFormData] = useState<
    RegisterformDetaType | LoginformDetaType | {}
  >({});
  const [loading, setLoading] = useState(false);
  const { updateUserInfo } = useContext(Context);
  const router = useRouter();

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((per) => ({ ...per, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: "login" | "register"
  ) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (type === "login") {
        await login(formData);
        let tokenReady = false;
        for (let i = 0; i < 5; i++) {
          const res = await checkTokenReady();
          tokenReady = res.data.data;
          if (tokenReady) break;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (tokenReady) {
          await updateUserInfo();
        } else {
          console.error("Token is not ready after multiple attempts");
        }
      } else {
        await register(formData);
      }

      setFormData({});
      changeMode(null);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  if (type === "login") {
    if (loading)
      return (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      );
    return (
      <form onSubmit={(e) => handleSubmit(e, "login")}>
        <div className="uppercase select-none font-medium text-2xl text-sky-500 mb-6">
          sign in
        </div>

        <div className="mb-4">
          <Input
            className="mb-2"
            label="email"
            type="email"
            name="email"
            required
            placeholder="Enter your Email ..."
            onChange={(e) => handleChangeData(e)}
          />
          <Input
            className="mb-2"
            label="password"
            type="password"
            name="password"
            required
            placeholder="Enter your Password ..."
            onChange={(e) => handleChangeData(e)}
          />
        </div>
        <div className="mb-4 select-none">
          <span>Do you have an account ?</span>
          <span
            className="text-sky-500 ml-1 cursor-pointer hover:text-sky-600"
            onClick={() => {
              changeMode("register");
              setFormData({});
            }}
          >
            create
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            className=" w-full h-8 text-zinc-200 capitalize "
            label="login"
            type="submit"
            color="primary"
          />
        </div>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e, "register");
        }}
      >
        <div className="uppercase select-none font-medium text-2xl text-sky-500 mb-6">
          register
        </div>

        <div className="mb-6">
          <Input
            className="mb-2"
            label="userName"
            type="text"
            name="userName"
            required
            placeholder="Enter your userName ..."
            onChange={(e) => handleChangeData(e)}
          />
          <Input
            className="mb-2"
            label="email"
            type="email"
            name="email"
            required
            placeholder="Enter your Email ..."
            onChange={(e) => handleChangeData(e)}
          />
          <Input
            className="mb-2"
            label="password"
            type="password"
            name="password"
            required
            placeholder="Enter your Password ..."
            onChange={(e) => handleChangeData(e)}
          />
          <Input
            className="mb-2"
            label="Password Confirmation"
            type="password"
            required
            placeholder="Enter your Password ..."
          />
        </div>
        <div className="mb-4 select-none">
          <span>Do you already have an account ?</span>
          <span
            className="text-sky-500 ml-1 cursor-pointer hover:text-sky-600"
            onClick={() => {
              changeMode("login");
              setFormData({});
            }}
          >
            login
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            className=" w-full h-8 text-zinc-200 capitalize "
            label="register"
            type="submit"
            color="primary"
          />
        </div>
      </form>
    );
  }
};

export default AuthForm;
