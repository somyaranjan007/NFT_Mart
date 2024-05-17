import { BsX } from "react-icons/bs";

import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from 'wagmi';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { createContractCredentials } from "@/lib/features/contractCredentialSlice";
import { useEffect } from "react";

const Explore = ({ setOpenHeader }) => {

    const { open } = useWeb3Modal();
    const { walletInfo } = useWalletInfo();
    const { address, isConnected, chain } = useAccount();

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

    return (
        <div className="absolute w-64 py-5 px-2 rounded-[5px] bg-slate-300 text-black top-20 s(1):top-[100px] s(1):right-[481px] s(2):right-[603px] ">
            <div className="flex items-center justify-end">
                <BsX className="text-[30px] text-left bg-gray-700 text-white rounded mb-2" onClick={() => setOpenHeader("")} />
            </div>
            <ul className="w-full flex flex-col">
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Collection</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Search</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Author Profile</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">NFT Details</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Account Setting</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700" onClick={() => open()}>Connect Wallet</li>
                <li className="hover:transition hover:ease-in-out hover:duration-2000 rounded px-2 py-2 hover:text-white hover:bg-gray-700">Blog</li>
            </ul>
        </div>
    )
}

export default Explore