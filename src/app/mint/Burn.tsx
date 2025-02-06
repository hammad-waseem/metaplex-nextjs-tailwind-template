//Create a Component for Burning NFTs

import ConfirmBurnModal from "./Modal/ConfirmBurnModal";
import Image from "next/image";
import vendingBg from "../../assets/vending-bg.png";
import vendingMachine from "../../assets/vending-machine.png";
import { useEffect, useState } from "react";

import NextImage from "next/image";
import {
  inria_serif_extra_bold,
  inria_serif_light,
  inria_serif_regular,
} from "../../../fonts";
import {
  fromWeb3JsTransaction,
  toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";
import Card from "../../components/Museum/CardList/Card";
import { Tooltip } from "react-tooltip";
import WalletButton from "../../components/WalletButton";
import { toast } from "react-toastify";
import axios from "axios";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { web3 } from "@project-serum/anchor";
import base58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { publicKey, transactionBuilder } from "@metaplex-foundation/umi";
import {
  burnV1,
  findMetadataPda,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import useUmiStore from "@/store/useUmiStore";
import { serialize } from "v8";
import { sendAndConfirmTransaction } from "@solana/web3.js";

import {
  HELIUS_RPC_URL,
  honeycombConnection,
  testCollectionAddress,
} from "../../lib/candy";
import { OFFCHAIN_URL } from "../../lib/candy";
import { cp } from "fs";

const burnedPerOkd = 3;

export const Burn = ({
  fetchNftData,
}: {
  fetchNftData: (mints: any[]) => Promise<any>;
}) => {
  const [selectedNfts, setSelectedNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [okds, setOkds] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);

  const walletState = useWallet();

  const fetchNfts = async () => {
    const response = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "text",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: walletState?.publicKey!.toString(),
          page: 1,
          limit: 100,
        },
      }),
    });

    console.log("response", testCollectionAddress.toString());
    const data = await response.json();
    const items = data?.result?.items;
    console.log(items, "ITEMS");
    const nfts = items?.filter(
      (nft: any) =>
        nft?.grouping[0]?.group_value === testCollectionAddress.toString()
    );
    console.log(nfts, "NFTS");
    setNfts(items);
  };

  useEffect(() => {
    if (!walletState.connected || !walletState.publicKey) return;
    fetchNfts();
  }, [walletState.connected]);

  const [open, setOpen] = useState(false);

  const { umi } = useUmiStore();

  const burnPooks = async () => {
    console.log(selectedNfts, "Button Pressed");
    setLoading(true);
    try {
      const res = await axios.post(`${OFFCHAIN_URL}/mint/burn`, {
        walletAddress: publicKey.toString(),
        mints: selectedNfts.map((nft) => nft.id),
      });

      if (!res?.data?.tx) throw new Error("No transaction found");

      const serializedTx = umi.transactions.deserialize(
        Uint8Array.from(bs58.decode(res.data.tx))
      );

      const txV0 = toWeb3JsTransaction(serializedTx);

      // Let the wallet handle both signing and sending
      const txId = await walletState.sendTransaction(txV0, honeycombConnection);

      if (!txId) throw new Error("Transaction failed");

      //call fetchNftData to update the nfts after 2 seconds of burning
      setTimeout(async () => {
        const data = await fetchNftData(res?.data?.mint);
        console.log(data, "DATA");
        setOkds(data);
      }, 2000);

      console.log(txId, "TRANSACTION ID");
      setLoading(false);
      setOpen(false);

      // setOkds(selectedNfts);
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast.error("Error burning pooks");
      // throw new Error(e);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(180deg, rgba(19,19,19,1) 0%, rgba(22,22,22,1) 60%, rgba(23,23,23,1) 100%)`,
      }}
      className="relative w-full h-screen"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={vendingBg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Vending Machine Background"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full z-10">
        {walletState.connected && walletState !== undefined ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-[100vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F7D05A] text-white"></div>
              </div>
            ) : (
              <>
                {" "}
                {nfts.length === 0 ? (
                  <>
                    <NextImage src={vendingMachine} alt="Vending Machine" />

                    <div className="flex flex-col justify-center items-center">
                      <h1
                        className={`${inria_serif_extra_bold.className} leading-none uppercase text-[50px] font-bold text-white pt-12`}
                      >
                        You dont own any pooks
                      </h1>
                      <p
                        className={`text-white text-[12px] text-center pt-1 ${inria_serif_light.className}  uppercase`}
                      >
                        To mint Okd, you must own 3 pooks to burn
                      </p>

                      <button
                        style={{
                          borderRadius: "9999px",
                        }}
                        className={`bg-[#F7D05A] mt-4 py-1 border-2 max-w-52 light-border hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-black text-center font-extrabold uppercase ${inria_serif_regular.className}`}
                        // onClick={() => setVisible(true)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[80%] sm:w-[60%] xl:w-[35%] md:w-[50%] 2xl:w-[32%] flex flex-col items-start justify-start">
                      <h1
                        className={`text-white text-[30px] text-left leading-none pt-1 ${inria_serif_extra_bold.className}  uppercase`}
                      >
                        {okds?.length === 0 ? "Burn Pooks" : "Success"}
                      </h1>
                      <h1
                        className={`text-white text-[12px] text-left  ${inria_serif_light.className}  uppercase`}
                      >
                        {okds?.length === 0
                          ? `  SELECT MINIMUM OF ${burnedPerOkd}  POOKS TO BURN FOR 1 OKD`
                          : `You've Minted ${okds?.length} Okd`}
                      </h1>
                    </div>
                    <div
                      className="mt-4 lg:mt-3 flex flex-col w-[80%] sm:w-[60%] xl:w-[35%] md:w-[50%] 2xl:w-[32%] overflow-y-auto max-h-[40vh]  lg:max-h-[34vh] custom-scrollbar  "
                      style={{
                        position: "relative", // Ensures proper containment
                      }}
                    >
                      <div className=" custom-scrollbar  grid grid-cols-6 lg:grid-cols-12 gap-4 pr-4  lg:pr-10 ">
                        {okds?.length === 0
                          ? nfts?.map((item: any, j: number) => (
                              <Card
                                textsize={"text-[12px]"}
                                handleClick={() => {
                                  setSelectedNfts((prev) => {
                                    if (prev.includes(item)) {
                                      return prev.filter((i) => i !== item);
                                    }
                                    return [...prev, item];
                                  });
                                }}
                                selected={selectedNfts.includes(item)}
                                onVendingMachine
                                // item={
                                //   j < nfts.length
                                //     ? {
                                //         imageUrl: item.image,
                                //         name: item.name,
                                //         explorerId: item.explorerId,
                                //         stakingPoints: item.stakingPoints,
                                //       }
                                //     : undefined
                                // }
                                item={{
                                  imageUrl: item?.content?.links?.image,
                                  name: item?.content?.metadata?.name,
                                  explorerId: item.explorerId,
                                  stakingPoints: item.stakingPoints,
                                }}
                                // onProfile={onProfile}
                                key={j}
                              />
                            ))
                          : okds?.map((item, j) => (
                              <Card
                                textsize={"text-[12px]"}
                                handleClick={() => {
                                  // setSelectedNfts((prev) => {
                                  //   if (prev.includes(item)) {
                                  //     return prev.filter((i) => i !== item);
                                  //   }
                                  //   return [...prev, item];
                                  // });
                                }}
                                //   selected={selectedNfts.includes(item)}
                                onVendingMachine
                                // item={
                                //   j < nfts.length
                                //     ? {
                                //         imageUrl: item.image,
                                //         name: item.name,
                                //         explorerId: item.explorerId,
                                //         stakingPoints: item.stakingPoints,
                                //       }
                                //     : undefined
                                // }
                                item={{
                                  imageUrl: item?.content?.links?.image,
                                  name: item?.content?.metadata?.name,
                                  explorerId: item.explorerId,
                                  stakingPoints: item.stakingPoints,
                                }}
                                // onProfile={onProfile}
                                key={j}
                              />
                            ))}
                      </div>
                    </div>

                    {okds?.length === 0 && (
                      <>
                        <div className="w-[30%] h-[1px] bg-white mt-12"></div>
                        <div className="mt-4 lg:mt-3 flex flex-col w-[80%] sm:w-[60%] xl:w-[35%] md:w-[50%] 2xl:w-[32%]">
                          <h1
                            className={`text-white text-[21px] text-center leading-none pt-4 ${inria_serif_extra_bold.className}  uppercase`}
                          >
                            Currently Selected
                          </h1>
                          <h1
                            className={`text-white text-[14px] text-center  ${inria_serif_light.className}  uppercase`}
                          >
                            Burning for{" "}
                            {(selectedNfts.length / burnedPerOkd).toFixed()} Okd
                          </h1>
                        </div>

                        <div
                          className="mt-4 lg:mt-3 flex flex-col w-[72%] sm:w-[52%] xl:w-[27%] md:w-[42%] 2xl:w-[24%]    overflow-y-auto max-h-[18vh]  lg:max-h-[27vh] custom-scrollbar  "
                          style={{
                            position: "relative", // Ensures proper containment
                          }}
                        >
                          <div className=" custom-scrollbar  grid grid-cols-6 xs:grid-cols-9 lg:grid-cols-12 gap-4 pr-4  lg:pr-10 ">
                            {selectedNfts.map((item, j) => (
                              <Card
                                textsize={"text-[12px]"}
                                handleClick={() => {
                                  // console.log(item);
                                  setSelectedNfts((prev) => {
                                    if (prev.includes(item)) {
                                      return prev.filter((i) => i !== item);
                                    }
                                    return [...prev, item];
                                  });
                                }}
                                // selected={selectedNfts.includes(item)}
                                onVendingMachine
                                // item={
                                //   j < nfts.length
                                //     ? {
                                //         imageUrl: item.image,
                                //         name: item.name,
                                //         explorerId: item.explorerId,
                                //         stakingPoints: item.stakingPoints,
                                //       }
                                //     : null
                                // }
                                item={{
                                  imageUrl: item?.content?.links?.image,
                                  name: item?.content?.metadata?.name,
                                  explorerId: item.explorerId,
                                  stakingPoints: item.stakingPoints,
                                }}
                                // onProfile={onProfile}
                                key={j}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {okds?.length === 0 ? (
                      <div className="flex justify-center gap-3 w-[80%] sm:w-[60%] xl:w-[35%] md:w-[50%] 2xl:w-[32%] mt-4">
                        <button
                          style={{
                            borderRadius: "9999px",
                          }}
                          className={`bg-black border-white py-1  max-w-52 border-[1px]  transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-white text-center font-extrabold uppercase ${inria_serif_regular.className}`}
                          onClick={() => walletState.disconnect()}
                        >
                          Buy Pooks
                        </button>
                        <button
                          id="tooltip-id2"
                          data-tooltip-variant="light"
                          data-tooltip-content={
                            //only show when selected nfts are not multiple of 3 or 0
                            selectedNfts.length % burnedPerOkd !== 0 ||
                            selectedNfts.length === 0
                              ? `you can only burn pooks in multiples of ${burnedPerOkd}`
                              : ""
                          }
                          //if selectedpooks are multiple of 3 then show the button else disable it
                          disabled={
                            selectedNfts.length % burnedPerOkd !== 0 ||
                            selectedNfts.length === 0
                          }
                          style={{
                            borderRadius: "9999px",
                          }}
                          className={` py-1 border-2 max-w-52 light-border hover:bg-[#f9e4a2] ${
                            //if selected nfts are not multiple of 3 then disable the button
                            selectedNfts.length % burnedPerOkd == 0 ||
                            selectedNfts.length === 0
                              ? "cursor-not-allowed  bg-[#f9e4a2]"
                              : "bg-[#F7D05A]"
                          } transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-black text-center font-extrabold uppercase ${
                            inria_serif_regular.className
                          }`}
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          Confirm Burn
                        </button>

                        <Tooltip
                          className={`${inria_serif_regular.className}`}
                          anchorSelect="#tooltip-id2"
                          noArrow={true}
                          style={{
                            marginTop: "10px",
                            borderRadius: "5px",
                            //Rubik
                            color: "white",
                            lineHeight: "0",
                            padding: "0.7rem",

                            //uppercase
                            textTransform: "uppercase",
                            fontWeight: 700,
                            border: "1px solid #C1C1C1",
                            fontSize: "10px",
                            background: "#B1B1B1",

                            backgroundColor: "black",
                          }}
                        ></Tooltip>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-3 w-[80%] sm:w-[60%] xl:w-[35%] md:w-[50%] 2xl:w-[32%] mt-10">
                        <button
                          style={{
                            borderRadius: "9999px",
                          }}
                          className={`bg-black border-white py-1  max-w-52 border-[1px]  transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-white text-center font-extrabold uppercase ${inria_serif_regular.className}`}
                          // onClick={() => setVisible(true)}
                        >
                          Buy Pooks
                        </button>
                        <button
                          //if selectedpooks are multiple of 3 then show the button else disable it
                          // disabled={
                          //   selectedNfts.length % 3 !== 0 || selectedNfts.length === 0
                          // }
                          style={{
                            borderRadius: "9999px",
                          }}
                          className={`bg-[#F7D05A] py-1 border-2 max-w-52 light-border hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-black text-center font-extrabold uppercase ${inria_serif_regular.className}`}
                          onClick={() => {
                            // router.push("/vending-machine");
                            setOkds([]);
                            setSelectedNfts([]);
                          }}
                        >
                          Burn More
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <NextImage src={vendingMachine} alt="Vending Machine" />
            <div className="flex flex-col justify-center items-center">
              <h1
                className={`${inria_serif_extra_bold.className} text-center leading-none uppercase text-[50px] font-bold text-white pt-12`}
              >
                The Vending Machine
              </h1>
              <p
                className={`text-white text-[12px] text-center pt-1 ${inria_serif_light.className}  uppercase`}
              >
                Connect Your Wallet to Burn Pooks
              </p>

              <WalletButton onVendingMachine />
            </div>
          </>
        )}

        {/* <VendingMachineItems /> */}
      </div>
      <ConfirmBurnModal
        open={open}
        setCollectiblesOpen={setOpen}
        userNfts={selectedNfts}
        handlesubmit={burnPooks}
        loading={loading}
      />
    </div>
  );
};
