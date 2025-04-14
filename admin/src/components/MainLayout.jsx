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
        <div className="flex-1 md:ml-48 overflow-y-auto p-6 bg-pink-200">
          {<Outlet />}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
