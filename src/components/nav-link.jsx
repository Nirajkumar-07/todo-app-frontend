import {
  Clock,
  LayoutDashboard,
  ListTodo,
  SquareCheckBig,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router";

export const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    key: "dashboard",
    icon: <LayoutDashboard size={21} />,
  },
  {
    title: "Today",
    href: "/today",
    key: "today",
    icon: <ListTodo size={21} />,
  },
  {
    title: "Vital Task",
    href: "/vital-tasks",
    key: "vital-tasks",
    icon: <Clock size={21} />,
  },
  {
    title: "My Tasks",
    href: "/my-tasks",
    key: "my-tasks",
    icon: <SquareCheckBig size={21} />,
  },
  {
    title: "My Account",
    href: "/account",
    key: "account",
    icon: <UserRound size={21} />,
  },
];

export default function NavLink({ LinkWrapperComponent }) {
  const { pathname } = useLocation();

  return (
    <div className="grid gap-2 text-start">
      {LinkWrapperComponent
        ? links.map((link) => (
            <LinkWrapperComponent key={link.key}>
              <Link
                to={link.href}
                className={
                  "px-2 py-3 flex gap-2 items-center rounded-md" +
                  (pathname === link.href ? " bg-blue-400 text-white" : "")
                }
              >
                {link.icon}
                {link.title}
              </Link>
            </LinkWrapperComponent>
          ))
        : links.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={
                "px-2 py-3 flex gap-2 items-center rounded-md" +
                (pathname === link.href ? " bg-blue-400 text-white" : "")
              }
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
    </div>
  );
}
