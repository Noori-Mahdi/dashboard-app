import Button from "@/components/Button";
import Table from "@/components/Table";
import UserTableAction from "@/components/UsersTableAction";
import { getAllUsers } from "@/services/users";
import { FaUsers } from "react-icons/fa";

const userManegmant = async () => {
  const users = await getAllUsers();

  return (
    <div className="bg-neutral-700 rounded-sm border border-neutral-800 w-full h-full ">
      <div className="flex h-1/12 justify-between items-center p-2">
        <div className="flex  items-center text-lg font-semibold text-zinc-200 capitalize">
          <FaUsers />
          <span className="ml-2">User List</span>
        </div>
        <div className="flex items-center h-6">
          <input
            className="bg-neutral-800 rounded-bl-sm border border-neutral-900 border-r-0 rounded-tl-sm outline-0 h-full px-1 tracking-wide py-0.5 text-sm font-medium text-zinc-300"
            type="text"
          />
          <Button
            className="h-full py-0.5 px-2 text-sm rounded-br-sm border-neutral-900 border border-l-0 rounded-tr-sm font-semibold"
            color="primary"
            label="search"
          />
        </div>
      </div>
      <div className="mx-2 h-full ">
        <Table actions list={[...users.data.data]} />
      </div>
    </div>
  );
};

export default userManegmant;
