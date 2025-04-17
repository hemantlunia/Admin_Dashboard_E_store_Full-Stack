import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <div className="flex h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-60 overflow-y-auto p-2 bg-gray-300">
          {<Outlet />}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
