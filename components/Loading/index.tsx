import "./style.css";
const Loading = () => {
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full absolute border-4 border-solid border-neutral-900 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="w-10 h-10 rounded-full animate-spin absolute  border-4 border-solid border-sky-500 border-t-transparent -translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Loading;
