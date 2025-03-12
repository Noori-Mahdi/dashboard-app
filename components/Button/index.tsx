import { ButtonProspType } from "@/types/type";

const Button = ({
  label,
  type = "button",
  className,
  color,
  onClick,
}: ButtonProspType) => {
  let colorButton;

  switch (color) {
    case "primary":
      colorButton = "bg-sky-400 hover:bg-sky-500";
      break;
    case "success":
      colorButton = "bg-green-800 hover:bg-green-900";
      break;
    case "warning":
      colorButton = "bg-yellow-500 hover:bg-yellow-700 ";
      break;
    case "danger":
      colorButton = " bg-red-500 hover:bg-red-700";
      break;
    case "info":
      colorButton = "bg-blue-500 hover:bg-blue-700";
      break;
    default:
      colorButton = "bg-sky-400 hover:bg-sky-500";
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer  font-medium ${colorButton} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
