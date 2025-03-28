"use client";

import { ModalPropsType } from "@/types/type";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, className, children, size}: ModalPropsType) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center">
      <div
        style={{ backgroundColor: "rgba(20,20,20,0.7)" }}
        className="absolute left-0 top-0 w-full h-full "
      ></div>
      <div
        className={`${className} p-6 rounded shadow-lg border text-zinc-200 bg-neutral-900 border-sky-500 relative ${size ? size:'w-96'}`}
      >
        <IoIosClose
          className="absolute text-2xl top-2 right-2 cursor-pointer text-gray-300 hover:text-red-600"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
