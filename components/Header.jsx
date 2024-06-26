'use client'
import Logo from "@/assets/NFT_Logo.jpg";
import Image from "next/image";
import Link from "next/link";
import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from 'wagmi';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { createContractCredentials } from "@/lib/features/contractCredentialSlice";
import { useEffect } from "react";

const Header = () => {

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
            <div className="text-base font-medium flex items-center justify-center">
                <Link href="/" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500"> Home </Link>
                <Link href="/explore" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500">Explore</Link>
                <Link href="/create" className="mx-5 hover:text-purple-800 hover:transition hover:ease-in-out hover:duration-500">Create</Link>

                {
                    !isConnected ? <button onClick={() => open()} className="ml-5 bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded">
                        Connect Wallet
                    </button> : <div className="ml-5 bg-gray-700 hover:bg-purple-800 hover:transition hover:ease-in-out hover:duration-500 text-white font-bold py-2 px-6 rounded flex items-center justify-between" onClick={() => open()}>
                        <Image src={walletInfo?.icon} alt="Logo" width={30} height={30} />
                        <p className="ml-2">{address.slice(0, 6) + "..." + address.slice(-4)}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header