import { Inter } from "next/font/google";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import Web3ModalProvider from "./WalletProvider"

import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'

import Header from "@/components/Header/HeaderUpdate";
import Footer from "@/components/Footer/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Canvas",
  description: "NFT Revolution with Canvas",
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
            <Footer />
          </Web3ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
