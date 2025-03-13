import AddCard from "@/components/AddCard";
import AddGameList from "@/components/AddGameList";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getProduct } from "@/services/product/api";
import { FaBoxesStacked } from "react-icons/fa6";

interface VideoGameProductType {
  id: number;
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

const itemManegmant = async () => {
  const productList = await getProduct();

  return (
    <div className="flex flex-col bg-neutral-700 rounded-sm border border-neutral-800 w-full h-full ">
      <div className="flex h-1/12 justify-between items-center p-2">
        <div className="flex  items-center text-lg font-semibold text-zinc-200 capitalize">
          <FaBoxesStacked />
          <span className="ml-2">Items List</span>
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
      <div className="mx-2 p-2 grow mb-2 border rounded overflow-y-scroll bg-neutral-800">
        <AddCard children={<AddGameList />} title="add new game" />
        {productList.data.data.map((itemInfo: VideoGameProductType) => {
          <Card
            key={itemInfo.id}
            coverImageUrl={itemInfo.coverImageUrl}
            playerCount={itemInfo.playerCount}
            title={itemInfo.title}
          />;
        })}
      </div>
    </div>
  );
};

export default itemManegmant;
