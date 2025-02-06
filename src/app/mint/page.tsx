"use client";

import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inria_serif_light,
  inria_serif_medium,
  inria_serif_regular,
} from "../../../fonts";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import MintRight from "../../assets/right.png";
import MintLeft from "../../assets/left.png";
import goldenTicket from "../../assets/golden-ticket.png";
import igIcon from "../../assets/ig-icon.png";
import twitterIcon from "../../assets/x-mint.png";
import tiktokIcon from "../../assets/tiktok-icon.png";

import useUmiStore from "@/store/useUmiStore";
import MintNFT from "@/lib/mintNft";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

import { Burn } from "./Burn";
import { unwrapOption } from "@metaplex-foundation/umi";
import { Connection, PublicKey } from "@solana/web3.js";

import closeIcon from "@/assets/X-white.png";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import {
  candyGuardAddress,
  candyMachineAddress,
  HELIUS_RPC_URL,
  heliusConnection,
  usersAllowList,
} from "@/lib/candy";

const goldenTicketsArray = [1, 4, 8, 11, 16, 19];

export default function MintPage() {
  const [selected, setSelected] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasGoldenticket, setHasGoldenticket] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { select, wallets } = useWallet();
  const [mintLimitPerUser, setMintLimitPerUser] = useState<number>(0);
  const [nftsMinted, setNftsMinted] = useState<any[]>([]);

  const [timer, setTimer] = useState<string>("00:00:00");
  // const { logout, wallet: walletState } = useHoneycomb();

  const walletState = useWallet();

  const maxlg = useMediaQuery("(max-width: 1023px)");
  const maxSm = useMediaQuery("(max-width: 639px)");
  const maxXs = useMediaQuery("(max-width: 400px)");
  const umiStore = useUmiStore.getState();

  useEffect(() => {
    document.body.style.backgroundColor = "#EFE6D3";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const diff = umiStore?.timerEndDateTime?.getTime()! - now.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimer(
        `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [umiStore.timerEndDateTime]);

  useEffect(() => {
    if (!walletState?.publicKey) return;
    if (!umiStore.activeGroup?.guards) return;
    const [mintedCountPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("mint_limit"),
        Buffer.from([unwrapOption(umiStore.activeGroup.guards.mintLimit)?.id!]), // phase id
        walletState?.publicKey.toBuffer(),
        new PublicKey(candyGuardAddress.toString()).toBuffer(),
        new PublicKey(candyMachineAddress.toString()).toBuffer(),
      ],
      new PublicKey("CMAGAKJ67e9hRZgfC5SFTbZH8MgEmtqazKXjmkaJjWTJ")
    );

    heliusConnection.getAccountInfo(mintedCountPDA).then((accountInfo) => {
      if (accountInfo && accountInfo.data) {
        const buffer = Buffer.from(new Uint8Array(accountInfo.data));
        const mintedCount = buffer.readUInt16LE(0); // Read 2 bytes from offset 0
        console.log("user minted in this phase:", mintedCount);
        setMintLimitPerUser(mintedCount);
      } else {
        setMintLimitPerUser(0);
        console.log(
          "Account info not found or empty for (minted nfts count) by user in current phase"
        );
      }
    });
    console.log("mintLimit", mintedCountPDA.toString());
  }, [walletState?.publicKey, umiStore.activeGroup]);

  const fetchNftData = async (mints: any[]) => {
    try {
      const response = await fetch(HELIUS_RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "getAssetBatch",
          params: {
            ids: mints.map((u) => u?.toString()),
          },
        }),
      });

      const data = await response.json();
      return data?.result;
    } catch (e) {
      console.error("error fetching nft data", e);
    }
  };

  return (
    <>
      {walletState === null || umiStore?.activeGroup === undefined ? (
        //loading
        <div className="flex justify-center items-center h-[100vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F7D05A] text-white"></div>
        </div>
      ) : (
        <>
          {umiStore?.activeGroup?.label !== "burn" ? (
            <div className="flex flex-col h-[100vh]   bg-[#EFE6D3] py-10">
              <>
                <div className="xl:container  items-center justify-center mx-auto py-5 lg:py-14 uppercase w-full lg:px-0 px-2 xs:px-4 ">
                  <div className="mx-5 md:mx-0 items-center justify-center">
                    <h3
                      className={`${inria_serif_extra_bold.className} text-[#252525] text-center font-black text-[22px] md:text-[40px] leading-none `}
                    >
                      OKD MINT
                    </h3>
                    <p
                      className={`${inria_serif_light.className} pt-1   text-center text-[13px] md:text-[15px] text-black `}
                    >
                      Current Phase -{" "}
                      <span
                        className={`${inria_serif_medium.className} uppercase text-[#000]`}
                      >
                        {umiStore?.activeGroup?.label === "admin"
                          ? "Testing"
                          : umiStore?.activeGroup?.label}
                        list
                      </span>
                    </p>
                    <div className="flex justify-center items-center py-1">
                      <div
                        className={`${inria_serif_light.className} text-[#303030]  text-[13px] md:text-[15px] px-4 py-1 items-center justify-center font-medium rounded-shape border-black border-[1px]  text-center bg-white `}
                      >
                        {timer ? timer : "00:00:00"}
                      </div>
                    </div>
                    <p
                      className={`${inria_serif_light.className} pb-2 text-center text-[#303030]`}
                    >
                      {umiStore?.activeGroup?.label === "admin"
                        ? "Time to Start"
                        : "Time Remained"}
                    </p>
                    <div className=" lg:w-[60%] xl:w-3/5 mx-auto stroke-2 rounded-[30px] border-[15px]  px-2 xs:px-4 py-10 md:px-10 md:py-8 bg-[#252525] !border-white relative shadow-lg  ">
                      <NextImage
                        className="absolute -bottom-[6rem] -right-2  lg:-right-[4.5rem] lg:-bottom-[5.5rem]"
                        src={MintRight}
                        alt="mint left"
                        width={maxlg ? 100 : 150}
                        height={maxlg ? 100 : 150}
                      />
                      <NextImage
                        className="absolute -left-2 -bottom-32  lg:-left-48 lg:-bottom-[110px]"
                        src={MintLeft}
                        alt="mint right"
                        width={maxlg ? 140 : 290}
                        height={maxlg ? 140 : 290}
                      />

                      {walletState?.connected && !walletState?.connecting ? (
                        nftsMinted?.length > 0 ? (
                          <>
                            <button
                              className="absolute right-6 top-6  z-10 cursor-pointer"
                              onClick={() => {
                                if (hasGoldenticket) {
                                  setHasGoldenticket(false);
                                } else {
                                  setNftsMinted([]);
                                  setCurrentSlide(0);
                                }
                              }}
                            >
                              <NextImage
                                width={12}
                                height={12}
                                src={closeIcon}
                                alt="close-icon"
                              />
                            </button>
                            <div
                              className={`pt-8   ${
                                hasGoldenticket ? "pb-0" : "pb-8"
                              }`}
                            >
                              <h3
                                className={` text-[30px] sm:text-[40px] text-center text-white ${inria_serif_extra_bold.className}  `}
                              >
                                Mint Successful
                              </h3>

                              {hasGoldenticket ? (
                                <>
                                  <div className="flex justify-center items-center pt-3">
                                    <NextImage
                                      src={goldenTicket}
                                      alt="golden ticket"
                                    />
                                  </div>
                                  <p
                                    className={`${inria_serif_light.className} text-center text-white pt-4 text-[10px] max-w-[90%] sm:max-w-[65%] mx-auto`}
                                  >
                                    SHUUUUUSSSSH... YOU’VE ALSO WON A GOLDEN
                                    TICKET. THIS SOUL BOUND TOKEN (SBT) WILL BE
                                    AIRDROPPED POST MINT AND CAN BE USED LATER
                                    TO CLAIM A PHYSICAL COLLECTIBLE FOR FREE,
                                  </p>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-center gap-2 items-center pt-3">
                                    {nftsMinted.map((nft, i) => (
                                      <NextImage
                                        key={i}
                                        className="rounded-xl"
                                        src={nft?.content?.links?.image}
                                        alt="okd"
                                        width={120}
                                        height={120}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}

                              <p
                                className={`${
                                  inria_serif_light.className
                                } text-center text-white ${
                                  hasGoldenticket ? "pt-[54px]" : "pt-16"
                                } text-[10px]`}
                              >
                                KEEP UP TO DATE WITH OKD, THERE MAYBE SOMETHING
                                FOR THOSE THAT SUBSCRIBE
                              </p>

                              <div className="flex justify-center items-center pt-1">
                                <button
                                  style={{
                                    borderRadius: "9999px",
                                  }}
                                  className="bg-[#F7D05A] py-1 border-2 light-border w-[40%] hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200     rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
                                  // onClick={() =>
                                  //   setHasGoldenticket(!hasGoldenticket)
                                  // }
                                >
                                  Subscribe Now
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <p
                              className={`text-center text-white ${inria_serif_light.className} pt-12 `}
                            >
                              {" "}
                              1. Select the Amount of NFTs you want to mint
                            </p>
                            <div className="flex justify-center items-center gap-4 mt-3">
                              <button
                                className={`
                      ${
                        selected === 1
                          ? "!bg-[#F7D05A] !text-black"
                          : "bg-[#6F6F6F] text-white"
                      }
  
  
                      bg-[#6F6F6F] text-white  text-2xl hover:text-black hover:bg-[#F7D05A] py-2 px-[19px] rounded-full ${
                        inria_serif_bold.className
                      } uppercase`}
                                onClick={() => setSelected(1)}
                              >
                                1
                              </button>
                              <button
                                // disabled={nftsMinted.length === 1}
                                className={`
                      ${
                        selected === 2
                          ? "!bg-[#F7D05A] !text-black"
                          : "bg-[#6F6F6F] text-white"
                      }
                      bg-[#6F6F6F] text-white hover:text-black  text-2xl hover:bg-[#F7D05A] py-2 px-[17px] rounded-full   ${
                        inria_serif_bold.className
                      } uppercase`}
                                onClick={() => setSelected(2)}
                              >
                                2
                              </button>
                            </div>
                            <p
                              className={`text-center text-white ${inria_serif_light.className}  pt-10`}
                            >
                              {" "}
                              2. Confirm your selection
                            </p>
                            <h3
                              className={`text-center text-[40px] text-white ${inria_serif_bold.className} text-3xl pt-2`}
                            >
                              {selected} {selected === 2 ? "NFTs" : "NFT"} -
                              <span className="text-[#F7D05A]">
                                {" "}
                                {umiStore?.pricePerNft * selected} SOL
                              </span>
                            </h3>
                            <div className="flex justify-center items-center  pt-8">
                              <button
                                id="tooltip-id3"
                                data-tooltip-variant="light"
                                data-tooltip-content={
                                  umiStore?.remainingNfts === 0
                                    ? "No NFTs Remaining"
                                    : umiStore?.activeGroup?.label === "admin"
                                    ? "Minting is Not Rolled Up Yet"
                                    : umiStore?.activeGroup?.label ===
                                        "white" &&
                                      !usersAllowList.includes(
                                        walletState?.publicKey?.toString()!
                                      )
                                    ? "You are not allowed to mint please wait for Public Sale"
                                    : mintLimitPerUser >= 2
                                    ? "You have already minted 2 NFTs in this phase"
                                    : mintLimitPerUser >= 1 && selected === 2
                                    ? "You can Only Mint 1 NFT in this phase"
                                    : ""
                                }
                                disabled={
                                  (umiStore?.activeGroup?.label === "white" &&
                                    !usersAllowList.includes(
                                      walletState?.publicKey?.toString()!
                                    )) ||
                                  umiStore.activeGroup.label === "admin" ||
                                  loading ||
                                  mintLimitPerUser >= 2 ||
                                  (mintLimitPerUser >= 1 && selected === 2) ||
                                  umiStore?.remainingNfts === 0
                                }
                                style={{
                                  borderRadius: "9999px",
                                }}
                                className={`bg-[#F7D05A] py-1 border-2 light-border w-[70%] sm:w-[60%]  md:w-[50%] hover:bg-[#f9e4a2]  ${
                                  mintLimitPerUser >= 2 ||
                                  (mintLimitPerUser >= 1 && selected === 2) ||
                                  umiStore?.activeGroup?.label === "admin" ||
                                  (umiStore?.activeGroup?.label === "white" &&
                                    !usersAllowList.includes(
                                      walletState?.publicKey?.toString()!
                                    )) ||
                                  loading ||
                                  umiStore?.remainingNfts === 0
                                    ? "bg-[#f9e4a2]"
                                    : "bg-[#F7D05A]"
                                } transition-all hover:delay-75 duration-200     rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase`}
                                onClick={async () => {
                                  if (umiStore?.remainingNfts === 0) {
                                    toast.error("No NFTs Remaining");
                                    return;
                                  }
                                  if (mintLimitPerUser >= 2) {
                                    toast.error(
                                      "You have already minted 2 NFTs in this phase"
                                    );
                                    return;
                                  } else if (
                                    mintLimitPerUser >= 1 &&
                                    selected === 2
                                  ) {
                                    toast.error(
                                      "You can Only Mint 1 NFT in this phase"
                                    );
                                    return;
                                  }

                                  //if active group is white and the publickey exists in userAllowlist
                                  if (
                                    umiStore?.activeGroup?.label! === "white" &&
                                    !usersAllowList.includes(
                                      walletState?.publicKey?.toString()!
                                    )
                                  ) {
                                    toast.error("You are not allowed to mint");
                                    return;
                                  }

                                  setLoading(true);

                                  let toastId = null;
                                  if (toastId) toast.dismiss(toastId);

                                  toastId = toast.loading(
                                    `Minting ${selected} NFT${
                                      selected > 1 ? "s" : ""
                                    }...`
                                  );

                                  const umi = await MintNFT(
                                    selected,
                                    walletState?.publicKey?.toString()!,
                                    umiStore?.activeGroup!,
                                    umiStore,
                                    umiStore?.candyMachine!,
                                    umiStore?.candyGuard!
                                  );
                                  console.log("umi", umi);
                                  if (umi) {
                                    umiStore.fetchPriceAndActiveGroup();
                                    setTimeout(async () => {
                                      const nftData = await fetchNftData(
                                        umi.map((u) => u?.publicKey.toString())
                                      );
                                      console.log("nftData", nftData);

                                      if (
                                        //check nft data if any item is null
                                        nftData &&
                                        !nftData.includes(null)
                                      ) {
                                        setNftsMinted(nftData);
                                        setLoading(false);

                                        toast.update(toastId, {
                                          render: `Successfully minted ${selected} NFT${
                                            selected > 1 ? "s" : ""
                                          }!`,
                                          type: "success",
                                          isLoading: false,
                                          closeButton: true,
                                          autoClose: 5000,
                                        });
                                        umiStore.fetchPriceAndActiveGroup();

                                        //now check if nftData has golden ticket
                                        const goldenTicketNft = nftData.find(
                                          (nft: any) =>
                                            goldenTicketsArray.includes(
                                              Number(
                                                nft?.content?.metadata?.name.split(
                                                  "#"
                                                )[1]
                                              )
                                            )
                                        );
                                        console.log(
                                          "goldenTicketNft",
                                          goldenTicketNft
                                        );
                                        if (goldenTicketNft) {
                                          //set has golden ticket after 10 seconds of minting
                                          setTimeout(() => {
                                            setHasGoldenticket(true);
                                          }, 10000);
                                        }

                                        //now
                                      } else {
                                        setLoading(false);
                                        toast.update(toastId, {
                                          render: "Error minting NFTs",
                                          type: "error",
                                          isLoading: false,
                                          closeButton: true,
                                          autoClose: 5000,
                                        });
                                      }
                                    }, 2000);
                                  } else {
                                    toast.update(toastId, {
                                      render: "Error minting NFTs",
                                      type: "error",
                                      isLoading: false,
                                      closeButton: true,
                                      autoClose: 5000,
                                    });

                                    setLoading(false);
                                  }
                                }}
                              >
                                {loading ? ( //loader
                                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#F7D05A] text-white"></div>
                                ) : (
                                  "Mint Now"
                                )}
                              </button>

                              {((umiStore.activeGroup.label === "white" &&
                                !usersAllowList.includes(
                                  walletState?.publicKey?.toString()!
                                )) ||
                                umiStore?.activeGroup?.label === "admin" ||
                                mintLimitPerUser >= 2 ||
                                (mintLimitPerUser >= 1 && selected === 2)) && (
                                <Tooltip
                                  className={`${inria_serif_regular.className}`}
                                  anchorSelect="#tooltip-id3"
                                  noArrow={true}
                                  style={{
                                    marginTop: "5px",
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
                              )}
                            </div>

                            <div className="flex justify-center items-center pt-12">
                              <div className="w-2/3 !border-[1px] border-[#FFFFFF]"></div>
                            </div>

                            <div className="flex flex-col justify-center items-center pt-4 -pb-2">
                              <p
                                className={`text-white ${inria_serif_regular.className} text-[10px]`}
                              >
                                {walletState?.publicKey?.toString().slice(0, 9)}
                                ...
                                {walletState?.publicKey?.toString().slice(-9)}
                              </p>

                              <button
                                onClick={async () => {
                                  walletState?.disconnect();
                                  // logout();
                                  setCurrentSlide(0);
                                }}
                                className={`${inria_serif_regular.className} mt-1   text-white border-[1px] border-white text-[10px] uppercase rounded-shape min-w-28 py-1 mb-10 xs:mb-3 sm:mb-0`}
                              >
                                <p className="leading-none"> Disconnect</p>
                              </button>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          {currentSlide === 0 && (
                            <div className="flex flex-col  justify-center items-center py-4">
                              <div className="flex flex-col sm:flex-row  justify-between gap-x-8 gap-y-1 sm:gap-y-0 items-start  sm:items-center rounded-shape bg-white border-[1px] border-black py-2 px-5 xs:px-10  w-fit">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-[#F7D05A] border-[1px] border-black w-5 h-5 flex justify-center items-center">
                                    <p
                                      className={` ${inria_serif_bold.className} text-black font-bold text-[13px] leading-none`}
                                    >
                                      1
                                    </p>
                                  </div>
                                  <div
                                    className={`${inria_serif_bold.className} text-[#252525] pl-2 text-[12px]  sm:text-sm whitespace-nowrap`}
                                  >
                                    CONNECT YOUR WALLET{" "}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-[#F7D05A] border-[1px] border-black  w-5 h-5 flex justify-center items-center">
                                    <p
                                      className={` ${inria_serif_bold.className} text-black font-bold text-[13px] leading-none`}
                                    >
                                      2
                                    </p>
                                  </div>
                                  <div
                                    className={`${inria_serif_bold.className} text-[#252525] pl-2 text-[12px]  sm:text-sm whitespace-nowrap`}
                                  >
                                    MINT NFTS
                                  </div>
                                </div>
                              </div>
                              <div className="border-[#BABABA] flex-col justify-center items-center   mb-8 py-24  ">
                                <h4
                                  className={` text-center text-white text-[40px] leading-none mb-4 ${inria_serif_extra_bold.className}`}
                                >
                                  Connect Your Wallet
                                </h4>
                                <div className="flex justify-center items-center mx-5 sm:mx-10 lg:mx-24">
                                  <button
                                    style={{
                                      borderRadius: "9999px",
                                    }}
                                    className="bg-[#F7D05A] py-1 border-2 light-border hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
                                    onClick={() => setCurrentSlide(1)}
                                  >
                                    Connect
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {currentSlide === 1 && (
                            <div className="py-16">
                              <h3
                                className={`${inria_serif_bold.className} text-white uppercase text-[20px] xs:text-[30px] text-center lg:text-[40px] xl:whitespace-nowrap `}
                              >
                                Connect a Wallet to Continue
                              </h3>

                              <div className="wallet-list mt-3  text-[#FFFFFF] rounded-xl md:px-16 lg:px-24 xl:px-28 2xl:px-32   ">
                                {wallets.map((wallet, i) => (
                                  <div
                                    key={wallet.adapter.name}
                                    className={`items-center py-3 px-4 cursor-pointer  border-t-[1px] ${
                                      i === wallets.length - 1
                                        ? "border-b-[1px]"
                                        : ""
                                    } ${
                                      wallet.adapter.connected
                                        ? "bg-[#333333]"
                                        : "bg-[#252525]"
                                    }
                    border-white  capitalize`}
                                  >
                                    <div
                                      className="flex justify-between items-center cursor-pointer capitalize"
                                      style={{
                                        borderBottom: 0,
                                      }}
                                    >
                                      <div className="flex items-center gap-2 pl-2">
                                        <Image
                                          src={wallet.adapter.icon}
                                          alt={wallet.adapter.icon}
                                          height={20}
                                          width={20}
                                          //make it grayscale if not connected
                                          className={`${
                                            wallet.adapter.connected
                                              ? ""
                                              : "filter grayscale"
                                          }`}
                                        />

                                        <h5
                                          className={`${inria_serif_bold.className} text-[13px] uppercase`}
                                        >
                                          {wallet.adapter.name}
                                        </h5>
                                      </div>

                                      <motion.button
                                        whileHover={{
                                          scale: [1.06, 1, 1.04, 1],
                                        }}
                                        onClick={() => {
                                          if (wallet.adapter.connected)
                                            wallet.adapter.disconnect();
                                          else {
                                            select(wallet.adapter.name);
                                            wallet.adapter.connect();
                                          }
                                        }}
                                        className={`${inria_serif_bold.className} rounded-shape text-[13px]  py-1 px-8  uppercase`}
                                      >
                                        {wallet.adapter.connected
                                          ? "Connected"
                                          : "Detected"}
                                      </motion.button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* connected wallets */}
                      {/* connect more wallet */}
                    </div>

                    <div className="flex justify-center items-center pt-6">
                      <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-1 sm:gap-2">
                          <button className="bg-[#F7D05A] rounded-full py-1 px-3 xs:px-4 sm:py-2 border-2 sm:px-6  lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                            <NextImage
                              src={twitterIcon}
                              alt="ig icon"
                              width={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                              height={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                            />
                          </button>
                          <button className="bg-[#F7D05A] rounded-full py-1 px-3 xs:px-4 sm:py-2 border-2 sm:px-6 lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                            <NextImage
                              src={igIcon}
                              alt="ig icon"
                              width={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                              height={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                            />
                          </button>
                          <button className="bg-[#F7D05A] rounded-full py-1 px-3 xs:px-4 sm:py-2  border-2 sm:px-6 lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                            <NextImage
                              width={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                              height={maxXs ? 8 : maxSm ? 10 : maxlg ? 15 : 18}
                              src={tiktokIcon}
                              alt="ig icon"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>

              {/* )} */}
            </div>
          ) : (
            <>
              <Burn fetchNftData={fetchNftData} />
            </>
          )}
        </>
      )}
    </>
  );
}
