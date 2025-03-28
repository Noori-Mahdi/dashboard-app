"use client";

import { CiCirclePlus } from "react-icons/ci";
import Modal from "../Modal";
import { useState } from "react";

interface AddCardPropsType {
  title: string;
  children: React.ReactNode;
}

const AddCard = ({ title, children }: AddCardPropsType) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setShow(true);
        }}
      >
        <div className="relative bg-neutral-900 text-zinc-300  hover:text-sky-500 cursor-pointer hover:bg-neutral-950 flex justify-center items-center  w-60 h-72 rounded border border-zinc-300">
          <div>
            <CiCirclePlus className="text-7xl text-center w-full mb-3 font-bold" />
            <div className="font-bold  text-xl uppercase">{title}</div>
          </div>
        </div>
      </div>
      <Modal
        size="w-11/12 min-h-fit max-h-full"
        onClose={() => setShow(false)}
        isOpen={show}
      >
        {children}
      </Modal>
    </>
  );
};

export default AddCard;
