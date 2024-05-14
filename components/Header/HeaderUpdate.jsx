"use client"
import Image from "next/image";
import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

import Explore from "./Explore";
import HelpSection from "./HelpSection";
import Notification from "./Notification";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Button from "../Button/Button";
import Search from "./Search";

import Logo from "@/assets/NFT_Logo.jpg";

const HeaderUpdate = () => {

    const [openHeaderFunction, setOpenHeaderFunction] = useState({ openHeader: "" });
    const [openSidebar, setOpenSideBar] = useState(false);

    const setOpenHeader = (openHeader) => {
        if (openHeaderFunction.openHeader === openHeader) return;
        setOpenHeaderFunction({ openHeader });
    }

    return (
        <div className="py-5 px-2 flex items-center justify-between s(1):px-7 s(2):px-32 text-gray-700">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={40} height={40} className="w-[27px] mr-2 rounded-full s(1):w-[40px]" />
                <h1 className=" font-semibold text-[20px] s(2):text-[28px] ">Canvas</h1>

                {/* This hidden and this will open when screen is large */}
                <div className="hidden border-2 ml-8 px-3 border-gray-700 rounded-full s(1):flex items-center justify-between">
                    <input
                        type="text"
                        name="search" id="id"
                        placeholder="Search item here..."
                        className="outline-none bg-transparent text-sm placeholder:text-gray-500 h-12 pr-3 w-52"
                    />
                    <BsSearch className="text-[20px] text-gray-700" />
                </div>
            </div>

            {/* This div for mobile version web not for pc */}
            <div className="flex items-center border s(1):hidden">
                <div>
                    <BsSearch className="text-[15px] text-gray-700" onClick={() => setOpenHeader("Search")} />
                    {openHeaderFunction.openHeader === "Search" && <Search setOpenHeader={setOpenHeader} />}
                </div>
                <div className="">
                    <MdNotifications onClick={() => setOpenHeader("Notification")} className=" cursor-pointer text-[20px] text-gray-700 ml-3" />
                    {openHeaderFunction.openHeader === "Notification" && <Notification setOpenHeader={setOpenHeader} />}
                </div>
                <div>
                    <Image src={Logo} alt="Profile" width={40} height={40} className="w-[27px] cursor-pointer rounded-full border ml-3" onClick={() => setOpenHeader("Profile")} />
                    {openHeaderFunction.openHeader === "Profile" && <Profile setOpenHeader={setOpenHeader} />}
                </div>
                <div>
                    {!openSidebar ? <CgMenuRight onClick={() => setOpenSideBar(true)} className="cursor-pointer text-[20px] text-gray-700 ml-3" /> : <CgMenuLeft onClick={() => setOpenSideBar(false)} className="cursor-pointer text-[20px] text-gray-700 ml-3" />}
                    {openSidebar && <Sidebar setOpenSideBar={setOpenSideBar} />}
                </div>
            </div>

            {/* This div is for pc not for mobile */}
            <div className="hidden s(1):flex text-base font-medium items-center justify-end w-full">
                <div className="ml-16">
                    <p className=" cursor-pointer font-bold" onClick={() => setOpenHeader("Explore")}>Explore</p>
                    {openHeaderFunction.openHeader === "Explore" && <Explore setOpenHeader={setOpenHeader} />}
                </div>
                <div className="ml-16">
                    <p className=" cursor-pointer font-bold" onClick={() => setOpenHeader("HelpSection")}>Help Center</p>
                    {openHeaderFunction.openHeader === "HelpSection" && <HelpSection setOpenHeader={setOpenHeader} />}
                </div>
                <div className="ml-16 stopClosed">
                    <MdNotifications onClick={() => setOpenHeader("Notification")} className=" cursor-pointer text-[25px] text-gray-700" />
                    {openHeaderFunction.openHeader === "Notification" && <Notification setOpenHeader={setOpenHeader} />}
                </div>
                <div className="ml-16">
                    <Button title={"Create"} />
                </div>
                <div className="ml-16">
                    <Image src={Logo} alt="Profile" width={40} height={40} className=" cursor-pointer rounded-full" onClick={() => setOpenHeader("Profile")} />
                    {openHeaderFunction.openHeader === "Profile" && <Profile setOpenHeader={setOpenHeader} />}
                </div>
            </div>
        </div>
    )
}

export default HeaderUpdate