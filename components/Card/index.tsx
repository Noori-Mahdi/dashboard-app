import { FaUsers } from "react-icons/fa";

interface CardPropsType {
  title: string;
  playerCount: number;
  coverImageUrl?: string;
}

const Card = ({ title, playerCount, coverImageUrl }: CardPropsType) => {
  return (
    <div className="relative flex flex-col w-60 h-72 rounded border border-zinc-300">
      <img
        className="grow rounded-md w-full border-0"
        src={coverImageUrl}
        alt={title}
      />
      <div className="rounded-bl rounded-br w-full h-2/6 bg-neutral-700 ">
        <div>{title}</div>
        <div className="flex">
          <FaUsers />
          <span>{playerCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
