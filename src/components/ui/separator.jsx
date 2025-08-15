export default function Separator({ className, orientation = "horizontal" }) {
  return (
    <div
      className={
        "bg-gray-400" +
        (orientation == "horizontal" ? " h-[1px]" : " w-[1px]") +
        (className ? " " + className : "")
      }
    />
  );
}
