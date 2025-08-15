import { Outlet } from "react-router";
import Header from "../components/header";
import { memo } from "react";
import SideNav from "../components/side-nav";

const MemoHeader = memo(Header);
const MemoSideNav = memo(SideNav);

export default function ManiLayout() {
  return (
    <main className="flex flex-col h-screen">
      <MemoHeader />
      <div className="w-full h-full flex gap-6">
        <MemoSideNav />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
