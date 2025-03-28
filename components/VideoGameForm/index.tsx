"use client";
import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import MultiSelectBox from "../multiSelectBox";
import { getGenre, getPlatform, getPublisher } from "@/services/selectBox";
import { postVideoGame } from "@/services/product/[id]";

interface VideoGameProduct {
  title: string;
  description: string;
  genre: string[];
  platform: string[];
  releaseDate: string;
  publisher: string[];
  developer: string;
  coverImageUrl?: string;
}

const VideoGameForm = () => {
  const [formData, setFormData] = useState<VideoGameProduct>({
    title: "",
    description: "",
    genre: [],
    platform: [],
    releaseDate: "2025",
    publisher: [],
    developer: "",
    coverImageUrl: "",
  });
  const [selectBoxs, setSelectBoxs] = useState({
    genre: [],
    platform: [],
    publisher: [],
  });

  const handleChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: {
    target: { name: string; value: any[] };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postVideoGame(formData);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handlGetAllSelectBoxDeta = async () => {
    try {
      const genre = await getGenre();
      const platform = await getPlatform();
      const publisher = await getPublisher();

      setSelectBoxs({
        genre: genre.data.data,
        platform: platform.data.data,
        publisher: publisher.data.data,
      });
    } catch (error) {
      console.error("Error fetching select box data:", error);
    }
  };

  useEffect(() => {
    handlGetAllSelectBoxDeta();
  }, []);

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-xl tracking-wide capitalize ">
          Add New Game
        </h3>
      </div>
      <hr className="text-sky-500 my-4" />
      <div className="w-full grow">
        <div className="inline-block w-4/12 p-2 h-fit">
          <Input
            label="Game Name"
            name="title"
            placeholder="Enter Game Name ..."
            type="text"
            required
            className="w-full"
            onChange={handleChangeData}
          />
        </div>
        <div className="inline-block w-4/12 p-2 h-fit">
          {selectBoxs.genre.length > 0 && (
            <MultiSelectBox
              label="Genre"
              options={selectBoxs.genre}
              name="genre"
              required
              onChange={handleSelectChange}
            />
          )}
        </div>
        <div className="inline-block w-4/12 p-2 h-fit">
          {selectBoxs.platform.length > 0 && (
            <MultiSelectBox
              label="Platform"
              options={selectBoxs.platform}
              name="platform"
              required
              onChange={handleSelectChange}
            />
          )}
        </div>
        <div className="inline-block w-4/12 p-2 h-fit">
          {selectBoxs.publisher.length > 0 && (
            <MultiSelectBox
              label="Publisher"
              options={selectBoxs.publisher}
              name="publisher"
              required
              onChange={handleSelectChange}
            />
          )}
        </div>
        <div className="inline-block w-4/12 p-2 h-fit">
          <Input
            required
            type="number"
            label="Release Date"
            name="releaseDate"
            min={1950}
            max={2025}
            defaultValue="2025"
            onChange={handleChangeData}
          />
        </div>
        <div className="inline-block w-4/12 p-2 h-fit">
          <Input
            required
            label="Developer"
            name="developer"
            type="text"
            onChange={handleChangeData}
          />
        </div>
        <div className="inline-block w-8/12 p-2 h-fit">
          <Input
            label="Description"
            name="description"
            placeholder="Enter description ..."
            type="textArea"
            required
            onChange={handleChangeData}
          />
        </div>
      </div>
      <Button
        className="w-fit px-2 py-1 rounded ml-auto mt-3"
        color="primary"
        label="Submit"
        type="submit"
      />
    </form>
  );
};

export default VideoGameForm;
