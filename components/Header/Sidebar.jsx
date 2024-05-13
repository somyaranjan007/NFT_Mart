import { BsX, BsSearch } from "react-icons/bs";
import Image from "next/image";


import Logo from "@/assets/NFT_Logo.jpg"


const Sidebar = ({ setOpenSideBar }) => {
    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-300 px-2 py-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image src={Logo} alt="Logo" width={40} height={40} className="w-[27px] mr-2 rounded-full" />
                    <h1 className=" font-semibold text-[20px]">Canvas</h1>
                </div>

                <div className="flex items-center justify-end">
                    <BsX
                        className="text-[30px] text-left bg-gray-700 text-white rounded"
                        onClick={() => setOpenSideBar(false)}
                    />
                   
                </div>
            </div>


        </div>
    )
}

export default Sidebar