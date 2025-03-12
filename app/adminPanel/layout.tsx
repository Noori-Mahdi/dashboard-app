import VerticalNav from "@/components/VerticalNav";
import { FaUsers } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subpages = [
    {
      subPageName: "User Manegmant",
      subPageURL: "userManegmant",
      subPageIcon: <FaUsers />,
    },
    {
      subPageName: "Message Manegmant",
      subPageURL: "messageManegmant",
      subPageIcon: <AiFillMessage />,
    },
  ];
  return (
    <div className="flex w-full h-11/12">
      <div className="max-w-2/12 w-fit h-full m-2 rounded-sm border-neutral-950 bg-neutral-800 border hover:border-sky-500">
        <VerticalNav subpages={subpages} />
      </div>
      <div className="w-10/12 min-h-full mt-2">{children}</div>
    </div>
  );
}
