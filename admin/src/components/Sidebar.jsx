import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { AlignVerticalDistributeEnd, ArrowBigDown, ArrowBigUpIcon, HomeIcon, LucideAmphora, LucidePackageCheck, LucidePlusCircle, LucideSave, ShoppingBag, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import InventoryLogo from "./Logo";

function Sidebar() {
  const [openMaster, setOpenMaster] = useState(false);
  const [openAllItem, setOpenAllItem] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  return (
    <>
      <aside className="hidden md:block w-60 h-screen bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
        <div className="flex flex-col justify-center items-center mb-6">
          <InventoryLogo />
          <h2 className="text-red-500 font-semibold">Industory</h2>
        </div>
        <h2 className="text-center text-sm bg-red-600 text-white p-3 uppercase mb-5">
          Inventory System
        </h2>
        <div className="flex justify-center items-center mb-5 underline border-dotted p-1">
          <HomeIcon />
          <h2 className="pl-2 font-bold text-xl">
            <Link to={`/`}>Dashboard</Link>
          </h2>
        </div>
        <h2 className="w-full h-0.5 bg-white"></h2>
        <ul>
          <li className="mb-2">
            <button
              onClick={() => setOpenMaster(!openMaster)}
              className="w-full text-left flex items-center justify-between px-2 py-2 rounded"
            >
              <h2 className="flex">
              <AlignVerticalDistributeEnd/>
              <span className="ml-2">Master</span>
              </h2>
              <span>{openMaster ? <ArrowBigUpIcon/> : <ArrowBigDown/>}</span>
            </button>

            {openMaster && (
              <NavLink
                to="/add"
               
                className={({isActive})=>`text-black py-2 px-2 flex rounded ml-6 hover:text-white ${isActive ? "bg-gray-700 text-white":""}`}              >
                <ShoppingCart className="mr-2" />
                <p>Add Item</p>
              </NavLink>
            )}
          </li>
          <h2 className="w-full h-0.5 mt-4 bg-white"></h2>
          <li>
            <button
              onClick={() => setOpenAllItem(!openAllItem)}
              className="w-full text-left flex items-center justify-between px-2 py-2 rounded"
            >
             <h2 className="flex">
             <ShoppingBag/>
             <span className="ml-2">All Items</span>
             </h2>
             <span>{openAllItem ? <ArrowBigUpIcon/> : <ArrowBigDown/>}</span>
             </button>
            {openAllItem && (
              <NavLink
                to="/items-list"
                
                className={({isActive})=>`text-black py-2 px-2 flex rounded ml-6 hover:text-white ${isActive ? "bg-gray-700 text-white":""}`}
              >
                <LucideSave className="mr-2" />
                <p>Items List</p>
              </NavLink>
            )}
          </li>
          <h2 className="w-full h-0.5 mt-4 bg-white"></h2>
          <li>
            <button
              onClick={() => setOpenPurchase(!openPurchase)}
              className="w-full text-left flex items-center justify-between px-2 py-2 rounded"
            >
              
              <h2 className="flex">
              <LucidePackageCheck/>
              <span className="ml-2">Purchase</span>
              </h2>
              
              <span>{openPurchase ? <ArrowBigUpIcon/> : <ArrowBigDown/>}</span>
            </button>
            {openPurchase && (
              <NavLink
                to="/add-purchase"
               
                className={({isActive})=>`text-black py-2 px-2 flex rounded ml-6 hover:text-white ${isActive ? "bg-gray-700 text-white":""}`}              >
                <LucideAmphora className="mr-2" />
                <p>Add Purchase</p>
              </NavLink>
            )}
          </li>
          <h2 className="w-full h-0.5 mt-4 bg-white"></h2>

        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
