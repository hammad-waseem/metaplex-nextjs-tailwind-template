import {
  createNoopSigner,
  publicKey,
  unwrapOption,
} from "@metaplex-foundation/umi";
// Example of a function that transfers SOL from one account to another pulling umi
// from the useUmiStore in a ts file which is not a React component file calling a hook.

import {
  CandyGuard,
  CandyMachine,
  DefaultGuardSet,
  getMerkleProof,
  GuardGroup,
  mintV1,
  route,
} from "@metaplex-foundation/mpl-core-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  some,
  transactionBuilder,
} from "@metaplex-foundation/umi";

// This function transfers SOL from the current wallet to a destination account and is callable
// from any tsx/ts or component file in the project.

import { getMerkleRoot } from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import umiWithSigner from "./umi/umiWithSigner";
import { usersAllowList } from "./candy";

//get nfts metadata from helius

const MintNFT = async (
  nftCount: number,
  walletAddress: string,
  activeGroup: GuardGroup<DefaultGuardSet>,
  umiStore: any,
  candyMachine: CandyMachine,
  candyGuard: CandyGuard<DefaultGuardSet>
) => {
  let toastId = null;
  if (toastId) toast.dismiss(toastId);

  try {
    const umi = umiWithSigner(
      createNoopSigner(publicKey(walletAddress.toString()))
    );

    // Create an array of signers for the number of NFTs requested
    const nftSigners = Array.from({ length: nftCount }, () =>
      generateSigner(umi)
    );

    let transactions = await Promise.all(
      Array.from({ length: nftCount }, async () =>
        transactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 800_000 }))
          .setLatestBlockhash(umi)
      )
    );

    // Add minting instructions for each NFT

    if (activeGroup.label === "public") {
      transactions = transactions.map((txBuilder, index) =>
        txBuilder.add(
          mintV1(umi, {
            asset: nftSigners[index],
            candyGuard: candyGuard.publicKey,
            candyMachine: candyMachine.publicKey,
            collection: candyMachine.collectionMint,
            group: "public",
            mintArgs: {
              solPayment: some({
                destination: candyMachine.authority,
              }),
              mintLimit: some({
                id: 2,
              }),
            },
          })
        )
      );
    } else if (activeGroup.label === "white") {
      console.log(walletAddress, "walletAddress");
      transactions = transactions.map((txBuilder, index) =>
        txBuilder
          .add(
            route(umi, {
              candyMachine: candyMachine.publicKey,
              candyGuard: candyGuard.publicKey,
              guard: "allowList",
              group: "white",
              routeArgs: {
                path: "proof",
                merkleRoot: getMerkleRoot(usersAllowList),
                merkleProof: getMerkleProof(
                  usersAllowList,
                  publicKey(walletAddress)
                ),
              },
            })
          )
          .add(
            mintV1(umi, {
              asset: nftSigners[index],
              candyGuard: candyGuard.publicKey,
              candyMachine: candyMachine.publicKey,
              collection: candyMachine.collectionMint,
              group: some(activeGroup.label),
              mintArgs: {
                allowList: some({
                  merkleRoot: getMerkleRoot(usersAllowList),
                }),
                solPayment: some({
                  destination: candyMachine.authority,
                }),
                mintLimit: some({
                  id: 1,
                }),
              },
            })
          )
      );
    } else {
      toast.error("Minting is Not Rolled Up Yet");
      return;
    }

    const txtransactions = await Promise.all(
      transactions.map(async (txBuilder) => {
        return await txBuilder.buildAndSign(umi);
      })
    );

    const signedTransaction = await umiStore.signer.signAllTransactions(
      txtransactions
    );

    console.log("signedTransaction", signedTransaction[0].signatures);

    const txs = await Promise.all(
      signedTransaction.map(async (tx: any) => {
        try {
          return await umi.rpc.sendTransaction(tx);
        } catch (error) {
          console.error("Transaction failed:", error);
          return null;
        }
      })
    );
    console.log("txs", txs);
    return nftSigners;
  } catch (error) {
    console.error("Error minting NFTs:", error);
    return null;
  }
};

export default MintNFT;
