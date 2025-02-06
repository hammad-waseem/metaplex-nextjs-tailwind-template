"use client";

import useUmiStore from "@/store/useUmiStore";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

function UmiProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();
  const umiStore = useUmiStore();

  useEffect(() => {
    if (!wallet.publicKey) return;
    // When wallet.publicKey changes, update the signer in umiStore with the new wallet adapter.
    umiStore.updateSigner(wallet as unknown as WalletAdapter);
  }, [wallet, umiStore]);

  // fetchCandyMachine every 5 seconds
  useEffect(() => {
    // Fetch immediately on mount
    // umiStore.fetchPriceAndActiveGroup();

    const interval = setInterval(() => {
      umiStore.fetchPriceAndActiveGroup();
    }, 5000);

    return () => clearInterval(interval);
  }, [umiStore]);

  useEffect(() => {
    umiStore.fetchPriceAndActiveGroup();
  }, []);

  return <>{children}</>;
}

export { UmiProvider };
