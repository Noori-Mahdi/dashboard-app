import { FaUsers } from "react-icons/fa";
import CardAction from "../CardAction";

interface CardPropsType {
  title: string;
  playerCount: number;
  coverImageUrl?: string;
  id: string;
}

const Card = ({ title, playerCount, coverImageUrl, id }: CardPropsType) => {
  return (
    <div className="relative cursor-pointer flex flex-col w-60 h-72 rounded-lg border border-zinc-300 shadow-lg">
      {coverImageUrl ? (
        <img
          className="grow rounded-t-lg w-full object-cover"
          src={coverImageUrl}
          alt={title}
        />
      ) : (
        <div className="max-w-100 h-100 bg-red-200"></div>
      )}

      <div className="rounded-b-lg w-full h-2/6 bg-neutral-700 p-4 text-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex items-center mt-2">
          <FaUsers className="mr-2" />
          <span>{playerCount}</span>
        </div>
        <CardAction id={id} />
      </div>
    </div>
  );
};

export default Card;
