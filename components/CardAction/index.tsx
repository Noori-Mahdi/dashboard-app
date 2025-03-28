"use client";
import { useState } from "react";
import Button from "../Button";
import { FaEye, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Modal from "../Modal";
import {
  deleteVideoGame,
  getVideoGame,
  putVideoGame,
} from "@/services/product/[id]";
import VideoGameForm from "../VideoGameForm";

interface CardActionPropsType {
  id: string;
}

const CardAction = ({ id }: CardActionPropsType) => {
  const [product, setProduct] = useState<any | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [show, setShow] = useState(false);

  const handleGetVideoGame = async (id: string, mode: "edit" | "view") => {
    try {
      const user = await getVideoGame(id);
      setProduct(user.data.data);
      setMode(mode);
      setShow(true);
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVideoGame(id);
    } catch (error) {}
  };

  const handleEdit = async (id: string) => {
    try {
      await putVideoGame(id, product);
    } catch (error) {}
  };

  return (
    <>
      <Button
        label={<FaEye className="text-xs" />}
        color="info"
        className="p-1  text-neutral-950 cursor-pointer rounded-full transition-colors"
        onClick={() => {
          handleGetVideoGame(id, "view");
        }}
      />
      <Button
        label={<FaUserEdit className="text-xs" />}
        color="warning"
        className="p-1 text-neutral-950 cursor-pointer rounded-full transition-colors"
        onClick={() => {
          handleGetVideoGame(id, "edit");
        }}
      />
      <Button
        label={<FaTrashAlt className="text-xs" />}
        color="danger"
        className=" text-neutral-950 cursor-pointer p-1 transition-colors rounded-full"
        onClick={() => {
          handleDelete(id);
        }}
      />
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <VideoGameForm/>
      </Modal>
    </>
  );
};

export default CardAction;
