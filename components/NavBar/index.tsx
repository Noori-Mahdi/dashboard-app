"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogoLinkedin } from "react-icons/io";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import AuthForm from "../AuthForm";
import { Context } from "@/context/MainContext";
import Avatar from "../Avatar";

const NavBar = () => {
  const [modeLoginModal, setModeLoginModal] = useState<
    "login" | "register" | null
  >(null);
  const { isLoggedIn, handleLogout, user } = useContext(Context);

  const currentPath = usePathname();
  console.log(
    currentPath.includes("adminPanel"),
    "currentPathcurrentPathcurrentPathcurrentPathcurrentPath"
  );

  const pages = [
    { name: "Store", url: "/store", public: true },
    { name: "Library", url: "/library", public: false },
    { name: "dashboard", url: "/dashboard", public: false },
    { name: "adminPanel", url: "/adminPanel/userManegmant", public: false },
  ];

  return (
    <div className="flex justify-between bg-neutral-800 w-full px-4 py-1.5">
      <ul className="flex items-center gap-5">
        <IoLogoLinkedin className="text-sky-500 text-xl font-medium" />

        {pages.map((page) => {
          if (page.public || isLoggedIn) {
            return (
              <li key={page.url}>
                <Link
                  className={`text-lg select-none uppercase font-bold ${
                    currentPath.includes(page.name)
                      ? "text-sky-500 border-b-2 border-sky-500 pb-1.5"
                      : "text-zinc-500 hover:text-zinc-200"
                  }`}
                  href={page.url}
                >
                  {page.name}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
      {!isLoggedIn ? (
        <Button
          label="login"
          onClick={() => {
            setModeLoginModal("login");
          }}
          color="primary"
          className="capitalize font-bold  text-neutral-800"
        />
      ) : (
        <Avatar {...user} />
      )}

      <Modal
        onClose={() => {
          setModeLoginModal(null);
        }}
        isOpen={modeLoginModal !== null}
      >
        <AuthForm
          type={modeLoginModal}
          changeMode={(e) => {
            setModeLoginModal(e);
          }}
        />
      </Modal>
    </div>
  );
};

export default NavBar;
