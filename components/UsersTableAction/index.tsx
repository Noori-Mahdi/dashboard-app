"use client";
import { FaEye, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import Button from "../Button";
import { deleteUser, getUser, putUser } from "@/services/users/[id]";
import { useState } from "react";
import { User } from "../Table";
import Modal from "../Modal";
import SwitchButton from "../SwitchButton";

interface UserTableActionPropsType {
  id: string;
}

const UserTableAction = ({ id }: UserTableActionPropsType) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [data, setData] = useState({ adminRole: user?.adminRole });
  const [show, setShow] = useState(false);

  const handleGetUser = async (id: string, mode: "edit" | "view") => {
    try {
      const user = await getUser(id);
      setUser(user.data.data);
      setMode(mode);
      setShow(true);
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {}
  };

  const handleEdit = async (id: string) => {
    try {
      await putUser(id, data);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-center items-center space-x-3">
        <Button
          label={<FaEye className="text-xs" />}
          color="info"
          className="p-1 text-neutral-950 cursor-pointer rounded-full transition-colors"
          onClick={() => {
            handleGetUser(id, "view");
          }}
        />
        <Button
          label={<FaUserEdit className="text-xs" />}
          color="warning"
          className="p-1 text-neutral-950 cursor-pointer rounded-full transition-colors"
          onClick={() => {
            handleGetUser(id, "edit");
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
      </div>
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <div>
          <div className="uppercase text-base font-semibold select-none text-start mb-8 ">
            user Info
          </div>
          <div className="flex mb-8 items-end">
            <div className="bg-neutral-800 border border-sky-500 flex justify-center items-center w-18 h-18 rounded-full">
              {user?.image ? (
                <img src={user?.image} alt="" />
              ) : (
                <FaUserLarge className="text-4xl" />
              )}
            </div>
            <div className="text-start ml-3">
              <div className="rounded-md">
                <span className="text-zinc-300 font-bold">user name : </span>
                <span className="text-sky-600 font-medium">{user?.name}</span>
              </div>
              <div className=" rounded-md">
                <span className="text-zinc-300 font-bold">email : </span>
                <span className="text-sky-600 font-medium">{user?.email}</span>
              </div>
            </div>
          </div>
          <div>
            <SwitchButton
              label="admin Role :"
              defaultValue={user?.adminRole ? user?.adminRole : false}
              disable={mode == "view" ? true : false}
              onClick={(e) => {
                setData({ adminRole: e });
              }}
            />
            <div className="flex justify-end mt-8 border-t pt-3">
              <Button
                color="danger"
                label={"close"}
                className=" font-medium capitalize px-1 py-0.5 text-base rounded-sm mr-1 min-w-12 "
                onClick={() => setShow(false)}
              />
              {mode === "edit" && (
                <Button
                  color="primary"
                  label={"edit"}
                  className=" font-medium capitalize px-1 py-0.5 text-base rounded-sm min-w-12 text-neutral-800"
                  onClick={() => handleEdit(id)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserTableAction;
