import BannerImage from "@/assets/NFT_Banner_Image.png";
import Image from "next/image";

const Banner = () => {
    return (
        <div className="flex justify-between items-center my-20">
            <div className="w-full mr-28">
                <h1 className=" text-5xl font-black leading-[60px]">Create, sell or collect <br /> digital items</h1>
                <p className="py-7 text-gray-400 text-base">Complete account of the system, and expound the actual teachings of the great explorer of human happiness.</p>
                <div>
                    <button className="bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 mr-5 rounded">Explore</button>

                    <button className="border border-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded">Create</button>
                </div>
            </div>
            <Image src={BannerImage} alt="Logo" width={450} height={450} className="" />
        </div>
    )
}

export default Banner;