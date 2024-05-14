'use client'

import Image from "next/image";
import Link from "next/link";
import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from 'wagmi';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { createContractCredentials } from "@/lib/features/contractCredentialSlice";
import { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

import Explore from "./Explore";
import HelpSection from "./HelpSection";
import Notification from "./Notification";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Button from "../Button/Button";

import Logo from "@/assets/NFT_Logo.jpg";
import ProfileImage from "@/assets/Profile.jpg";
import Search from "./Search";

const Header = () => {

    const [openSidebar, setOpenSideBar] = useState(false);
    const [openSearch, setOpenSearch] = useState(false); 

    const { open } = useWeb3Modal();
    const { walletInfo } = useWalletInfo();
    const { address, isConnected, chain } = useAccount();

    const [headerOpen, setHeaderOpen] = useState({ open: "" });


    const dispatch = useAppDispatch();

    const contract = useAppSelector(state => state.contract);
    console.log(contract);

    useEffect(() => {
        if (!chain?.id) return
        const chainConfiguration = {
            chainId: chain?.id,
            rpcUrl: chain?.rpcUrls.default.http[0]
        }
        dispatch(createContractCredentials(chainConfiguration));
    }, [chain?.id])

    const headerOpenClose = (section) => {
        console.log(headerOpen.open);
        if (headerOpen.open === section) return
        setHeaderOpen({ open: section });
    }

    return (
        <div className="py-5 px-2 flex items-center justify-between border">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={40} height={40} className="w-[27px] mr-2 rounded-full" />
                <h1 className=" font-semibold text-[20px]">Canvas</h1>

                <div className="s1:hidden flex items-center justify-between border ml-8 px-3 border-gray-700 rounded-full">
                    <input
                        type="text"
                        name="search" id="id"
                        placeholder="Search item here..."
                        className="outline-none bg-transparent text-sm placeholder:text-gray-500 h-12 pr-3 w-52"
                    />
                    <BsSearch className="text-[20px] text-gray-700" />
                </div>
            </div>

            <div className="flex items-center">

                <div>
                    <BsSearch className="text-[15px] text-gray-700" onClick={() => setOpenSearch(true)} />
                    {openSearch && <Search setOpenSearch={setOpenSearch} />}
                </div>

                <div className="">
                    <MdNotifications onClick={() => headerOpenClose("Notification")} className=" cursor-pointer text-[20px] text-gray-700 ml-3" />
                    {headerOpen.open === "Notification" && <Notification setHeaderOpen={setHeaderOpen} />}
                </div>

                <div>
                    <Image src={Logo} alt="Profile" width={40} height={40} className="w-[27px] cursor-pointer rounded-full border ml-3" onClick={() => headerOpenClose("Profile")} />
                </div>

                <div>

                    {
                        !openSidebar ?
                            <CgMenuRight onClick={() => setOpenSideBar(true)} className="cursor-pointer text-[20px] text-gray-700 ml-3" /> :
                            <CgMenuLeft onClick={() => setOpenSideBar(false)} className="cursor-pointer text-[20px] text-gray-700 ml-3" />
                    }
                    {
                        openSidebar && <Sidebar setOpenSideBar={setOpenSideBar} />
                    }
                </div>
            </div>

            {/* <div className="text-base font-medium flex items-center justify-end w-full">
                <div className="ml-16 stopClosed">
                    <MdNotifications onClick={() => headerOpenClose("Notification")} className=" cursor-pointer text-[25px] text-gray-700" />
                    {headerOpen.open === "Notification" && <Notification setHeaderOpen={setHeaderOpen} />}
                </div>
                <div className="ml-16 stopClosed">
                    <Image src={Logo} alt="Profile" width={40} height={40} className=" cursor-pointer rounded-full border" onClick={() => headerOpenClose("Profile")} />
                    {headerOpen.open === "Profile" && <Profile setHeaderOpen={setHeaderOpen} />}
                </div>
            </div> */}


            {/* <div className="text-base font-medium flex items-center justify-end w-full">
                <div className="ml-16 border">
                    <p className=" cursor-pointer" onClick={() => headerOpenClose("Explore")}>Explore</p>
                    {headerOpen.open === "Explore" && <Explore setHeaderOpen={setHeaderOpen} />}
                </div>
                <div className="ml-16">
                    <p className=" cursor-pointer" onClick={() => headerOpenClose("HelpSection")}>Help Center</p>
                    {headerOpen.open === "HelpSection" && <HelpSection setHeaderOpen={setHeaderOpen} />}
                </div>
                <div className="ml-16 stopClosed">
                    <MdNotifications onClick={() => headerOpenClose("Notification")} className=" cursor-pointer text-[25px] text-gray-700" />
                    {headerOpen.open === "Notification" && <Notification setHeaderOpen={setHeaderOpen} />}
                </div>
                <div className="ml-16 stopClosed">
                    <Button title={"Create"} />
                </div>
                <div className="ml-16 stopClosed">
                    <Image src={Logo} alt="Profile" width={40} height={40} className=" cursor-pointer rounded-full border" onClick={() => headerOpenClose("Profile")} />
                    {headerOpen.open === "Profile" && <Profile setHeaderOpen={setHeaderOpen} />}
                </div>
            </div> */}
        </div>
    )
}



{/* {
!isConnected ? <button onClick={() => open()} className="ml-5 bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded">
    Connect Wallet
</button> : <div className="ml-5 bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded flex items-center justify-between" onClick={() => open()}>
    <Image src={walletInfo?.icon} alt="Logo" width={30} height={30} />
    <p className="ml-2">{address.slice(0, 6) + "..." + address.slice(-4)}</p>
</div>
} */}
export default Header