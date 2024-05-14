import BannerImage from "@/assets/NFT_Banner_Image.png";

import Image from "next/image";

import Button from "./Button/Button";

const Banner = () => {
    return (
        <div className="flex justify-between items-center my-20 text-gray-700">
            <div className="w-full mr-28">
                <h1 className=" text-5xl font-black leading-[60px]">Create, sell or collect <br /> digital items</h1>
                <p className="py-7 text-gray-700 text-base w-[500px]">Complete account of the system, and expound the actual teachings of the great explorer of human happiness.</p>
                <div className="flex items-center">
                    <div className="pr-3"><Button title={"Start your search"} /></div>
                </div>
            </div>
            <Image src={BannerImage} alt="Logo" width={450} height={450} className="" />
        </div>
    )
}

export default Banner;