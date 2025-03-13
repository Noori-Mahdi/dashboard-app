import { FaCheck, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import UserTableAction from "../UsersTableAction";
import { FaUserLarge } from "react-icons/fa6";

export interface User {
  id: string;
  image?: string;
  name: string;
  email: string;
  adminRole: boolean;
}

interface TablePropsType {
  list: User[];
  actions: boolean;
}

const renderHeaders = (headers: string[], actions: boolean) => {
  const updatedHeaders = actions ? [...headers, "Actions"] : [...headers];
  return updatedHeaders.map((header) => (
    <th
      key={header === "id" ? "#" : header}
      className="px-4 py-2 border-b border-gray-700 bg-neutral-900 text-gray-100 text-left"
    >
      {header === "id" ? "#" : header}
    </th>
  ));
};

const renderCell = (cell: any, index: number, rowIndex: number) => {
  if (index === 0)
    return (
      <td
        key={"count"}
        className="px-4 py-2 border-b border-gray-700 text-gray-300"
      >
        {rowIndex + 1}
      </td>
    );
  if (index === 1) {
    return cell ? (
      <td>
        <img src={cell} alt="" />
      </td>
    ) : (
      <td className="px-4 py-2 text-4xl border-b border-gray-700 text-center">
        <FaUserLarge className="rounded-full text-zinc-300 p-1 bg-neutral-900 border border-sky-500" />
      </td>
    );
  }
  if (typeof cell === "boolean") {
    return (
      <td
        key={index}
        className="px-4 py-2 border-b border-gray-700 text-center"
      >
        {cell ? (
          <FaCheck className="text-green-500 text-sm" />
        ) : (
          <IoIosClose className="text-red-500 text-2xl" />
        )}
      </td>
    );
  }

  return (
    <td
      key={index}
      className="px-4 py-2 border-b border-gray-700 text-gray-300"
    >
      {cell}
    </td>
  );
};

const renderRows = (list: User[], actions: boolean) => {
  return list.map((userInfo, rowIndex) => (
    <tr
      key={userInfo.id}
      className={`${
        rowIndex % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"
      } hover:bg-neutral-600`}
    >
      {Object.values(userInfo).map((cell, index) =>
        renderCell(cell, index, rowIndex)
      )}
      {actions && (
        <td className=" py-2 border-b border-gray-700 text-center">
          <UserTableAction id={userInfo.id} />
        </td>
      )}
    </tr>
  ));
};


const Table = ({ list, actions }: TablePropsType) => {
  const headers = Object.keys(list[0]);

  return (
    <table className="w-full max-h-full border border-gray-800 rounded-lg ">
      <thead className="">
        <tr className="select-none">{renderHeaders(headers, actions)}</tr>
      </thead>
      <tbody className="">{renderRows(list, actions)}</tbody>
    </table>
  );
};

export default Table;
