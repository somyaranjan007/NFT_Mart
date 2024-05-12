import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import StoreProvider from "./StoreProvider";
import Web3ModalProvider from "./WalletProvider"

import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFT-Mart",
  description: "NFT Revolution with NFT-Mart",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Web3ModalProvider initialState={initialState}>
            <Header />
            {children}
          </Web3ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
