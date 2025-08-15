export default function Card({ icon, title, count }) {
  return (
    <div className="w-full rounded-md flex items-center gap-2 bg-white px-4 py-6 shadow group">
      <div className="basis-[35%]">
        <i className="w-full h-full flex justify-center items-center transform transition-transform duration-300 group-hover:-translate-y-1">
          {icon}
        </i>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-gray-400">{title}</h4>
        <span className="font-semibold text-lg lg:text-xl">{count}</span>
      </div>
    </div>
  );
}
