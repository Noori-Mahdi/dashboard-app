import AddCard from "../AddCard";
import VideoGameForm from "../VideoGameForm";
import Card from "../Card";

interface VideoGamePropsType {
  id: string;
  title: string;
  description: string;
  genre: string;
  platform: string;
  playerCount: number;
  releaseDate: Date;
  price: number;
  publisher: string;
  developer: string;
  rating: number;
  coverImageUrl?: string;
  trailerUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CardListPropsType {
  list: VideoGamePropsType[];
}

const CardList = ({ list }: CardListPropsType) => {
  return (
    <div className="flex gap-2 mx-2 p-2 grow mb-2 border rounded overflow-y-scroll bg-neutral-800">
      <AddCard children={<VideoGameForm/>} title="add new game" />
      {list.length > 0 &&
        list.map((itemInfo) => {
          return (
            <Card
              key={itemInfo.id}
              coverImageUrl={itemInfo.coverImageUrl}
              playerCount={itemInfo.playerCount}
              title={itemInfo.title}
              id={itemInfo.id}
            />
          );
        })}
    </div>
  );
};

export default CardList;
