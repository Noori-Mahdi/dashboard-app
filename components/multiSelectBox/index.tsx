"use client";

import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import { IoIosAdd, IoIosClose } from "react-icons/io";

export interface OptinTypeInSelectBox {
  id: string;
  name: string;
}

export interface Target {
  target: { name: string; value: OptinTypeInSelectBox[] };
}

export interface MultiSelectBoxPropsType {
  options: OptinTypeInSelectBox[];
  label: string;
  name: string;
  defaultValueId?: string;
  required: boolean;
  onChange?: (e: Target) => void;
}

const MultiSelectBox = ({
  options,
  label,
  name,
  defaultValueId,
  required,
  onChange,
}: MultiSelectBoxPropsType) => {
  const [value, setValue] = useState<OptinTypeInSelectBox[]>([]);
  const [showList, setShowList] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  if (!options.length) return null;

  useEffect(() => {
    if (defaultValueId) {
      const defaultValue = options.find(
        (option) => option.id === defaultValueId
      );
      if (defaultValue) setValue([defaultValue]);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [defaultValueId, options]);

  useEffect(() => {
    onChange && onChange({ target: { name, value } });
  }, [value, name]);

  const toggleOption = (option: OptinTypeInSelectBox) => {
    setValue((prevValue) =>
      prevValue.some((item) => item.id === option.id)
        ? prevValue.filter((item) => item.id !== option.id)
        : [...prevValue, option]
    );
  };

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      <div
        className="relative cursor-pointer"
        onClick={() => setShowList((prev) => !prev)}
      >
        <div>
          <div className="flex gap-2 select-none">
            <div className="mb-2 capitalize  font-medium tracking-wide">
              {label}{" "}
            </div>
            {required && <div className="text-sky-500">*</div>}
          </div>
          <div className="relative">
            <div className="absolute flex gap-1 overflow-hidden items-center h-full left-0 top-0 bg-neutral-600 w-full tracking-wide font-medium rounded-sm p-1 outline-0 border border-neutral-700">
              {value.map((e) => (
                <div
                  key={e.name}
                  className="flex text-sm justify-between place-items-center min-w-fit h-3 border-2 border-sky-500 p-2 rounded-lg"
                >
                  <span>{e.name}</span>
                  <span>
                    <IoIosClose />
                  </span>
                </div>
              ))}
            </div>
            <input
              className={`bg-neutral-600 w-full tracking-wide font-medium rounded-sm p-1 outline-0 border border-neutral-700 placeholder:text-sm`}
              name={name}
            />
          </div>
        </div>
      </div>
      {showList && (
        <ul className="absolute z-30 bg-neutral-800 border border-sky-500 rounded-sm w-full">
          {options.map((option) => (
            <li
              key={option.id}
              className={`p-2 hover:bg-neutral-700 flex justify-between items-center cursor-pointer ${
                value.some((item) => item.id === option.id)
                  ? "bg-neutral-700 font-medium text-gray-300"
                  : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              <span>{option.name}</span>

              {value.some((item) => item.id === option.id) ? (
                <IoIosClose className="text-red-500" />
              ) : (
                <IoIosAdd className="text-green-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectBox;
