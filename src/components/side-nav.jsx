import { LogOut } from "lucide-react";
import avatar from "../assets/images/avatar.jpg";
import NavLink from "./nav-link";
import Separator from "./ui/separator";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/user";

export default function SideNav() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/signin");
  };
  return (
    <div className="w-[30rem] h-full lg:flex flex-col justify-end max-lg:hidden">
      <div className="w-full rounded-md h-[90%] bg-blue-50 relative px-4">
        <div className="flex flex-col justify-between gap-2 content-start text-center pt-[3rem] h-full">
          <div className="w-full flex justify-center absolute top-[-2.5rem] place-self-center">
            <img
              src={user?.image || avatar}
              alt="avatar"
              height={50}
              width={50}
              className="object-contain rounded-full cursor-pointer w-20 h-20 border"
            />
          </div>
          <div className="w-full h-full overflow-y-auto flex flex-col">
            <div>
              <h3 className="text-base font-semibold">
                {user?.username || ""}
              </h3>
              <span className="text-sm tracking-wider">
                {user?.email || ""}
              </span>
            </div>
            <Separator className={"my-4"} />
            <div>
              <NavLink />
            </div>
          </div>
          <div className="grid items-end">
            <button
              className="px-2 py-3 flex gap-2 items-center rounded-md"
              onClick={handleSignOut}
            >
              <i>
                <LogOut size={20} />
              </i>{" "}
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
