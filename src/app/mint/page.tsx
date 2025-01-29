"use client";

import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inria_serif_light,
  inria_serif_medium,
  inria_serif_regular,
} from "../../../fonts";
// import { useHoneycomb } from "@/hooks";

import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useCallback, useEffect, useState } from "react";

//immport next image
import NextImage from "next/image";

import MintRight from "../../assets/right.png";
import MintLeft from "../../assets/left.png";
import Okd from "../../assets/okd-dummy.png";
import goldenTicket from "../../assets/golden-ticket.png";
import igIcon from "../../assets/ig-icon.png";
import twitterIcon from "../../assets/x-mint.png";
import tiktokIcon from "../../assets/tiktok-icon.png";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function MintPage() {
  const [selected, setSelected] = useState<number>(2);
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [hasGoldenticket, setHasGoldenticket] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkingWallet, setCheckingWallet] = useState<boolean>(false);
  const [showWalletList, setShowWalletList] = useState(true);
  const [walletStatus, setWalletStatus] = useState<0 | 1 | 2>(0);
  const { select, wallets, connected, publicKey, disconnect } = useWallet();
  // const {
  //   user,
  //   fetchUserForChecking,
  //   AddWallet,
  //   addingWalletLoader,
  //   authStatus,
  //   authToken,
  //   profile,
  //   loadIdentityDeps,
  //   updateProfile,
  //   logout,
  //   wallet: walletState,
  // } = useHoneycomb();

  // useEffect(() => {
  //   console.log("wallets", walletState);
  // }, [walletState]);

  const maxlg = useMediaQuery("(max-width: 1023px)");
  const maxSm = useMediaQuery("(max-width: 639px)");

  // const checkWalletIsExists = useCallback(async (): Promise<0 | 1 | 2> => {
  //   if (connected && publicKey && user) {
  //     setCheckingWallet(true);
  //     const isExists = user.wallets.wallets.some(
  //       (w) => w === publicKey.toString()
  //     );

  //     if (isExists) {
  //       setCheckingWallet(false);
  //       return 1;
  //     }
  //     const User = await fetchUserForChecking(publicKey.toString());
  //     setCheckingWallet(false);
  //     if (Object.keys(User).length) return 2;

  //     return 0;
  //   }
  // }, [connected, publicKey, user]);

  // useEffect(() => {
  //   (async () => {
  //     const status = await checkWalletIsExists();
  //     setWalletStatus(status);
  //   })();
  // }, [connected, publicKey, user]);

  //chnge body background color
  useEffect(() => {
    document.body.style.backgroundColor = "#EFE6D3";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  }, []);

  return (
    <div className="flex flex-col h-fit   bg-[#EFE6D3] py-10">
      <div className="lg:container  items-center justify-center mx-auto py-5 lg:py-14 uppercase w-full lg:px-0 px-2 xs:px-4 ">
        <div className="mx-5 md:mx-0 items-center justify-center">
          <h3
            className={`${inria_serif_extra_bold.className} text-black  text-center font-black text-[22px] md:text-[40px] leading-none `}
          >
            OKD MINT
          </h3>
          <p
            className={`${inria_serif_light.className} pt-1   text-center text-[13px] md:text-[15px] text-black `}
          >
            Current Phase -{" "}
            <span className={`${inria_serif_medium.className} text-[#000]`}>
              Whitelist
            </span>
          </p>
          <div className="flex justify-center items-center py-1">
            <div
              className={`${inria_serif_light.className} text-black   text-[13px] md:text-[15px] px-4 py-1 items-center justify-center font-medium rounded-shape border-black border-[1px]  text-center bg-white `}
            >
              24:00:00
            </div>
          </div>
          <p
            className={`${inria_serif_light.className} text-black  pb-2 text-center`}
          >
            Time Remained
          </p>
          <div className=" lg:w-[60%] xl:w-3/5 mx-auto stroke-2 rounded-[30px] border-[15px]  px-2 xs:px-4 py-10 md:px-10 md:py-8 bg-[#252525] !border-white relative shadow-lg  ">
            <NextImage
              className="absolute -bottom-[6rem] -right-2  lg:-right-[4.5rem] lg:-bottom-[5.5rem]"
              src={MintRight}
              alt="mint left"
              width={maxlg ? 80 : 80}
              height={maxlg ? 80 : 80}
            />
            <NextImage
              className="absolute -left-2 -bottom-24  lg:-left-48 lg:-bottom-[110px]"
              src={MintLeft}
              alt="mint right"
              width={maxlg ? 120 : 120}
              height={maxlg ? 120 : 120}
            />

            {connected ? (
              isMinted ? (
                <div className={`pt-8   ${hasGoldenticket ? "pb-0" : "pb-8"}`}>
                  <h3
                    className={` text-[30px] sm:text-[40px] text-center text-white ${inria_serif_extra_bold.className}  `}
                  >
                    Mint Successful
                  </h3>

                  {hasGoldenticket ? (
                    <>
                      <div className="flex justify-center items-center pt-3">
                        <NextImage src={goldenTicket} alt="golden ticket" />
                      </div>
                      <p
                        className={`${inria_serif_light.className} text-center text-white pt-4 text-[10px] max-w-[90%] sm:max-w-[65%] mx-auto`}
                      >
                        SHUUUUUSSSSH... YOU’VE ALSO WON A GOLDEN TICKET. THIS
                        SOUL BOUND TOKEN (SBT) WILL BE AIRDROPPED POST MINT AND
                        CAN BE USED LATER TO CLAIM A PHYSICAL COLLECTIBLE FOR
                        FREE,
                      </p>
                    </>
                  ) : (
                    <>
                      {selected === 1 ? (
                        <div className="flex justify-center items-center pt-3">
                          <NextImage src={Okd} alt="okd" />
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2 items-center pt-3">
                          <NextImage src={Okd} alt="okd" />
                          <NextImage src={Okd} alt="okd" />
                        </div>
                      )}
                    </>
                  )}

                  <p
                    className={`${
                      inria_serif_light.className
                    } text-center text-white ${
                      hasGoldenticket ? "pt-[54px]" : "pt-16"
                    } text-[10px]`}
                  >
                    KEEP UP TO DATE WITH OKD, THERE MAYBE SOMETHING FOR THOSE
                    THAT SUBSCRIBE
                  </p>

                  <div className="flex justify-center items-center pt-1">
                    <button
                      style={{
                        borderRadius: "9999px",
                      }}
                      className="bg-[#F7D05A] py-1 border-2 light-border w-[40%] border-black hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200     rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
                      onClick={() => setHasGoldenticket(!hasGoldenticket)}
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
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
                      className={`
                      ${
                        selected === 2
                          ? "!bg-[#F7D05A] !text-black"
                          : "bg-[#6F6F6F] text-white"
                      }
                      bg-[#6F6F6F] text-white hover:text-black  text-2xl hover:bg-[#F7D05A] py-2 px-[17px] rounded-full ${
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
                    {selected} NFTs -
                    <span className="text-[#F7D05A]"> {selected} SOL</span>
                  </h3>
                  <div className="flex justify-center items-center  pt-8">
                    <button
                      style={{
                        borderRadius: "9999px",
                      }}
                      className="bg-[#F7D05A] py-1 border-2 light-border w-[70%] border-black  sm:w-[60%]  md:w-[50%] hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200     rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
                      onClick={() => setIsMinted(true)}
                    >
                      Mint Now
                    </button>
                  </div>

                  <div className="flex justify-center items-center pt-12">
                    <div className="w-2/3 !border-[1px] border-[#FFFFFF]"></div>
                  </div>

                  <div className="flex flex-col justify-center items-center pt-4 -pb-2">
                    <p
                      className={`text-white ${inria_serif_regular.className} text-[10px]`}
                    >
                      {publicKey?.toString().slice(0, 9)}...
                      {publicKey?.toString().slice(-9)}
                    </p>

                    <button
                      onClick={async () => {
                        disconnect();
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
                          className={`${inria_serif_bold.className} text-black   pl-2 text-[12px]  sm:text-sm whitespace-nowrap`}
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
                          className={`${inria_serif_bold.className} text-black   pl-2 text-[12px]  sm:text-sm whitespace-nowrap`}
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
                          className="bg-[#F7D05A] py-1 border-2 light-border border-black hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
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
                            i === wallets.length - 1 ? "border-b-[1px]" : ""
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
                              whileHover={{ scale: [1.06, 1, 1.04, 1] }}
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
                <button className="bg-[#F7D05A] border-black  border-[1px] rounded-full py-1 px-4 sm:py-2  sm:px-6  lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                  <NextImage
                    src={twitterIcon}
                    alt="ig icon"
                    width={maxSm ? 10 : maxlg ? 15 : 18}
                    height={maxSm ? 10 : maxlg ? 15 : 18}
                  />
                </button>
                <button className="bg-[#F7D05A] border-black border-[1px] rounded-full py-1 px-4 sm:py-2  sm:px-6 lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                  <NextImage
                    src={igIcon}
                    alt="ig icon"
                    width={maxSm ? 10 : maxlg ? 15 : 18}
                    height={maxSm ? 10 : maxlg ? 15 : 18}
                  />
                </button>
                <button className="bg-[#F7D05A] border-black border-[1px] rounded-full py-1 px-4 sm:py-2  sm:px-6 lg:py-3 lg:px-8 light-border  hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200      inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase">
                  <NextImage
                    width={maxSm ? 10 : maxlg ? 15 : 18}
                    height={maxSm ? 10 : maxlg ? 15 : 18}
                    src={tiktokIcon}
                    alt="ig icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
