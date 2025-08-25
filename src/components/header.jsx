import { useEffect } from "react";
import avatar from "../assets/images/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { LogOut, Menu, Plus } from "lucide-react";
import { getUser } from "../service/user.service";
import Separator from "./ui/separator";
import NavLink, { links } from "./nav-link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/user/user";
import { getTaskList } from "../service/task.service";
import { getStateTasks } from "../features/tasks/tasks";
import { Button } from "@mui/material";

function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await getUser();
      const taskListRes = await getTaskList();
      if (taskListRes.success) dispatch(getStateTasks(taskListRes.data));
      if (res.success) dispatch(setUser(res.data));
    })();
  }, []);

  const navigate = useNavigate();
  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const headerText = links.some((link) => link.href === pathname)
    ? pathname.replace("/", "").replace("-", " ")
    : "Dashboard";
  return (
    <div className="py-5 px-2 lg:px-4 flex items-center justify-between gap-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <i className="border rounded border-black block p-1">
                <Menu size={20} />
              </i>
            </SheetTrigger>
            <SheetContent>
              <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full h-full grid content-start">
                  <div className="grid justify-center content-start text-center">
                    <div className="w-full flex justify-center">
                      <img
                        src={user?.image || avatar}
                        alt="avatar"
                        height={50}
                        width={50}
                        className="object-contain rounded-full cursor-pointer w-20 h-20 border"
                      />
                    </div>
                    <h3 className="text-base font-semibold">
                      {user?.username || ""}
                    </h3>
                    <span className="text-sm tracking-wider">
                      {user?.email || ""}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <NavLink LinkWrapperComponent={SheetClose} />
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
            </SheetContent>
          </Sheet>
        </div>
        <div className="capitalize font-bold text-2xl lg:text-3xl tracking-wide lg:ps-24">
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            {headerText}
          </span>
          {/* <span className="text-blue-400">
            {headerText.slice(0, Math.trunc(headerText.length / 2))}
          </span>
          <span className="text-blue-500">
            {headerText.slice(Math.trunc(headerText.length / 2))}
          </span> */}
        </div>
      </div>
      <div className="max-lg:hidden">
        <Link to="/task/add">
          <Button
            color="primary"
            variant="contained"
            className="!gap-2 !items-center"
          >
            <i>
              <Plus size={20} />
            </i>{" "}
            Add Task
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
