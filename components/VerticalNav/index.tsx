"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface subpageType {
  subPageName: string;
  subPageURL: string;
  subPageIcon: React.ReactNode;
}

interface VerticalNavPropsType {
  subpages: subpageType[];
}

const VerticalNav = ({ subpages }: VerticalNavPropsType) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const currentPath = usePathname();

  return (
    <ul>
      <div className="flex justify-between items-center mb-2 p-2 ">
        {!isMinimized && (
          <div className="text-base font-semibold text-zinc-300 uppercase tracking-wide select-none">
            page
          </div>
        )}

        {isMinimized ? (
          <FaAngleDoubleRight
            onClick={() => {
              setIsMinimized(false);
            }}
            className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
          />
        ) : (
          <FaAngleDoubleLeft
            onClick={() => {
              setIsMinimized(true);
            }}
            className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
          />
        )}
      </div>
      {subpages.map((page) => (
        <Link
          key={page.subPageURL}
          className={`flex justify-between items-center font-medium p-2 ${
            currentPath.includes(page.subPageURL)
              ? "text-sky-500 bg-neutral-900"
              : "text-zinc-500 hover:text-zinc-200"
          }  hover:bg-neutral-900`}
          href={page.subPageURL}
        >
          {!isMinimized && (
            <div className="grow text-ellipsis overflow-hidden select-none mr-2">
              {page.subPageName}
            </div>
          )}

          <div className="text-xl select-none">{page.subPageIcon}</div>
        </Link>
      ))}
    </ul>
  );
};

export default VerticalNav;
