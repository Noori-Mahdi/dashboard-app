import { useState } from "react";

interface SwitchButtonPropsType {
  label: string;
  defaultValue: boolean;
  disable?: boolean;
  onClick?: (e: boolean) => void;
}

const SwitchButton = ({
  label,
  defaultValue,
  disable,
  onClick,
}: SwitchButtonPropsType) => {
  const [active, setActive] = useState<boolean>(defaultValue || false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newActive = !active;
    setActive(newActive);
    onClick && onClick(newActive);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="text-base capitalize font-semibold text-zinc-300 select-none">
        {label}
      </div>
      <div
        className={`relative flex items-center cursor-pointer h-4 w-9 bg-neutral-800  py-2 rounded-xl border ${
          disable
            ? "border-neutral-600"
            : active
            ? "border-sky-800 bg-sky-500"
            : "border-sky-800 bg-neutral-600"
        } `}
        onClick={(e) => {
          if (!disable) handleClick(e);
        }}
      >
        <div
          className={`absolute  transition-transform duration-300 ${
            active ? " translate-x-5" : " translate-x-1"
          } h-3 w-3 ${disable ? "bg-neutral-600" : "bg-sky-700"}  rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default SwitchButton;
