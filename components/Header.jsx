import Logo from "@/assets/NFT_Logo.jpg";
import Image from "next/image";
import Link from "next/link";

// for shadow style: shadow-gray-700 shadow-md
const Header = () => {
    return (
        <div className="py-5 px-56 flex items-center justify-between">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" width={30} height={30} className=" mr-2 rounded-full" />
                <h1 className=" font-semibold text-2xl">NFT-MART</h1>
                <input
                    type="search"
                    name="search" id="id"
                    placeholder="Search item here..."
                    className="outline-none bg-transparent ml-8 border border-gray-700 text-sm placeholder:text-gray-500 h-12 rounded px-3 w-64"
                />
            </div>
            <div className="text-base font-medium">
                <Link href="/" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500"> Home </Link>
                <Link href="/explore" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500">Explore</Link>
                <Link href="/create" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500">Create</Link>
                <button class="ml-5 bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded">
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}

export default Header