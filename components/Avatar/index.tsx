import { FaUser } from "react-icons/fa";

interface AvatarPropsType {
  id: string;
  name: string;
  image: string;
}

const Avatar = ({ id, name, image }: AvatarPropsType) => {
  return (
    <div className="flex items-center cursor-pointer hover:text-zinc-200 max-w-44">
      <div className="mx-2 font-medium text-base tracking-wide text-zinc-200 grow overflow-hidden text-ellipsis">
        {name}
      </div>
      <div>
        {image ? (
          <div className="border-2  p-1.5 border-sky-500 rounded-full">
            <img className="rounded-full" src={image} />
          </div>
        ) : name ? (
          <div className="flex justify-center items-center border-2 p-1.5 border-sky-500 text-white select-nonetext-xl font-semibold uppercase bg-neutral-900 rounded-full w-7 h-7">
            {name.trim().charAt(0)}
          </div>
        ) : (
          <FaUser className="text-4xl  border-2 border-sky-500 p-1.5 text-white bg-neutral-900 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Avatar;
