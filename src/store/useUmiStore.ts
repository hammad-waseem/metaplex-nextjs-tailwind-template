import {
  candyGuardAddress,
  candyMachineAddress,
  HELIUS_RPC_URL,
} from "@/lib/candy";
import { mplCore } from "@metaplex-foundation/mpl-core";
import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
  fetchCandyGuard,
  fetchCandyMachine,
  GuardGroup,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-core-candy-machine";
import { Signer, Umi, unwrapOption } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { create } from "zustand";

interface UmiState {
  umi: Umi;
  signer: Signer | undefined;
  updateSigner: (signer: WalletAdapter) => void;
  fetchPriceAndActiveGroup: () => Promise<void>;
  pricePerNft: number;
  activeGroup: GuardGroup<DefaultGuardSet> | undefined;
  timerEndDateTime: Date | undefined;
  candyMachine: CandyMachine | undefined;
  candyGuard: CandyGuard<DefaultGuardSet> | undefined;
  remainingNfts: number;
}

const useUmiStore = create<UmiState>()((set, get) => ({
  // Replace URI with either hardcode, a const variable, or .env value
  umi: createUmi(HELIUS_RPC_URL).use(mplCandyMachine()).use(mplCore()),
  signer: undefined,
  pricePerNft: 0,
  activeGroup: undefined,
  timerEndDateTime: undefined,
  candyGuard: undefined,
  candyMachine: undefined,
  remainingNfts: 0,

  updateSigner: (signer) => {
    const currentSigner = get().signer;
    const newSigner = createSignerFromWalletAdapter(signer);

    if (
      !currentSigner ||
      currentSigner.publicKey.toString() !== newSigner.publicKey.toString()
    ) {
      set(() => ({ signer: newSigner }));
    }
  },

  fetchPriceAndActiveGroup: async () => {
    const { umi } = get();
    const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
    const candyGuard = await fetchCandyGuard(umi, candyGuardAddress);

    const currentDate = new Date();

    const groups = candyGuard.groups;

    // console.log("groups", groups);

    let foundGroup = groups.find((group, i) => {
      const startDateRaw = unwrapOption(group.guards.startDate)!.date;
      const endDateRaw = unwrapOption(group.guards.endDate)!.date;

      // Convert BigInt to Number and multiply by 1000 to convert seconds to milliseconds
      const startDate = new Date(Number(startDateRaw) * 1000);
      const endDate = new Date(Number(endDateRaw) * 1000);

      // console.log("startDate ", i, startDate);
      // console.log("endDate", i, endDate);
      // console.log("currentDate", currentDate);

      return currentDate >= startDate && currentDate <= endDate;
    });

    let pricePerNft = 0;
    if (foundGroup) {
      foundGroup = groups[3];
      // console.log("Active group found", foundGroup);
    } else {
      foundGroup = groups[3];

      // console.log("No active group found");
    }

    if (foundGroup?.guards?.solPayment?.__option === "None") {
      pricePerNft = 0;
    } else {
      pricePerNft =
        Number(
          unwrapOption(foundGroup?.guards?.solPayment)!.lamports.basisPoints
        ) /
        10 **
          Number(
            unwrapOption(foundGroup?.guards?.solPayment)!.lamports.decimals
          );
    }

    const timerEndDateTime = new Date(
      Number(unwrapOption(foundGroup?.guards?.endDate)!.date) * 1000
    );

    const remainingNfts =
      Number(unwrapOption(foundGroup?.guards?.redeemedAmount)!.maximum) -
      Number(candyMachine.itemsRedeemed);

    set(() => ({
      pricePerNft,
      activeGroup: foundGroup,
      timerEndDateTime,
      candyGuard,
      candyMachine,
      remainingNfts,
    }));
  },
}));

export default useUmiStore;
