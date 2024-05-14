import Image from "next/image";

import {
    BsFacebook,
    BsLinkedin,
    BsTwitter,
    BsYoutube,
    BsInstagram,
    BsFillSendFill
} from "react-icons/bs";

import Logo from "@/assets/NFT_Logo.jpg";

const Footer = () => {
    return (
        <div className="py-5 s(1):px-7 s(2):px-32 s(2):flex text-gray-700">

            <div className="w-full flex flex-col justify-between ">
                <div className="flex items-center">
                    <Image src={Logo} alt="Logo" width={40} height={40} className="w-[27px] mr-2 rounded-full s(1):w-[40px]" />
                    <h1 className="text-gray-700 font-semibold text-[20px] s(2):text-[28px]">Canvas</h1>
                </div>
                <div>
                    <div className="s(2):pb-7 w-full s(2):pr-5">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nam delectus magni saepe sapiente dolores totam distinctio placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim odit illum quod.
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <BsFacebook className="mr-8 text-[20px] text-gray-700" />
                        <BsLinkedin className="mr-8 text-[20px] text-gray-700" />
                        <BsTwitter className="mr-8 text-[20px] text-gray-700" />
                        <BsYoutube className="mr-8 text-[20px] text-gray-700" />
                        <BsInstagram className="mr-8 text-[20px] text-gray-700" />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col justify-between">
                <h1 className="text-base font-bold">Explore</h1>
                <ul className="w-full flex flex-col pl-7 pt-8">
                    <li className="pb-2">Collection</li>
                    <li className="pb-2">Search</li>
                    <li className="pb-2">Author Profile</li>
                    <li className="pb-2">NFT Details</li>
                    <li className="pb-2">Account Setting</li>
                    <li className="pb-2">Connect Wallet</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div className="w-full flex flex-col justify-between">
                <h1 className="text-base font-bold">Help Center</h1>
                <ul className="w-full flex flex-col pl-7 pt-8">
                    <li className="pb-2">Collection</li>
                    <li className="pb-2">Search</li>
                    <li className="pb-2">Author Profile</li>
                    <li className="pb-2">NFT Details</li>
                    <li className="pb-2">Account Setting</li>
                    <li className="pb-2">Connect Wallet</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div className="w-full flex flex-col">
                <h1 className="text-base font-bold">Subscribe</h1>
                <div className="w-full border bg-gray-700 flex items-center justify-between p-5 rounded-full mt-8">
                    <input type="text" placeholder="Enter your email" className=" bg-transparent outline-none text-gray-200 px-2" />
                    <BsFillSendFill className="text-[20px] text-gray-200" />
                </div>
                <p className="pt-5 pl-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nam delectus magni saepe sapiente dolores</p>
            </div>
        </div>
    )
}

export default Footer