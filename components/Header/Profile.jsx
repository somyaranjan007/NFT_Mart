import { BsX } from "react-icons/bs";

const Profile = ({ setOpenHeader }) => {
    return (
        <div className="absolute w-64 py-5 px-2 rounded-[5px] text-black bg-slate-300 right-[8px] top-20 s(1):top-[100px] s(2):right-[53px]">
            <div className="flex items-center justify-end">
                <BsX className="text-[30px] text-left bg-gray-700 text-white rounded mb-2" onClick={() => setOpenHeader("")} />
            </div>
            <ul className="w-full flex flex-col">
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Collection</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Search</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Author Profile</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">NFT Details</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Account Setting</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Connect Wallet</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Blog</li>
            </ul>
        </div>
    )
}

export default Profile