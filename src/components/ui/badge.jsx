const BadgeVariant = {
  success: "bg-green-50 text-green-500",
  destructive: "bg-red-50 text-red-500",
};

/**
 * @typedef {"success" | "destructive" } VariantType
 */

/**
 * @typedef {{
 * variant?: VariantType,
 * children: React.ReactNode,
 * className?: string
 * }} BadgeProps
 */

/**
 * @param {BadgeProps} props
 */

export default function Badge(props) {
  return (
    <div
      className={
        "text-xs rounded-full h-fit w-fit px-2 py-0.5 font-medium " +
        BadgeVariant[props.variant] +
        (props.className ? " " + props.className : "")
      }
    >
      {props.children}
    </div>
  );
}
