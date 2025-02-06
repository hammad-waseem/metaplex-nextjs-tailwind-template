"use client";

import Card from "../../../components/Museum/CardList/Card";
import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inria_serif_regular,
} from "../../../../fonts";
import { Nft } from "../../../lib/candy";

import { useState } from "react";
import closeIcon from "@/assets/X.png";
import NextImage from "next/image";
export default function CollectiblesDetails({
  setCollectiblesOpen,
  isEditing,
  setDisplayPfp,
  userNfts,
  handlesubmit,
  loading,
}: {
  setCollectiblesOpen: any;
  isEditing: any;
  setDisplayPfp: any;
  userNfts: any;
  handlesubmit: any;
  loading: any;
}) {
  // const { nfts } = useHoneycomb();
  const [open, setOpen] = useState(false);
  const [activeNft, setActiveNft] = useState<Nft | null>(null);

  return (
    <div className=" lg:px-8 lg:rounded-[25px] minToLg:h-[100vh] lg:w-[50%] xl:w-[40%]  2xl:w-1/4 mx-auto  pb-36 pt-16 bg-black border-[1px] border-white  stroke-2 lg:py-14    p-5 sm:px-7 ">
      <h3
        style={{}}
        className={`font-black lg:text-[30px] text-center uppercase text-white sm:text-[30px] text-[20px] xs:text-[25px]  leading-none ${inria_serif_extra_bold.className} font-extrabold `}
      >
        Confirm Burn
      </h3>
      <p
        className={`text-white text-center text-[12px] uppercase  ${inria_serif_regular.className}`}
      >
        You are Burning {userNfts.length} Pooks for{" "}
        {
          //three pooks for 1 okd
          (userNfts.length / 3).toFixed()
        }{" "}
        Okd
      </p>
      {/* close icon */}
      <button
        className="absolute right-10 top-10  z-10 cursor-pointer"
        onClick={() => {
          setCollectiblesOpen(false);
        }}
      >
        <NextImage src={closeIcon} alt="close-icon" />
      </button>
      {/* close icon */}
      {/* <button onClick={() => setCollectiblesOpen(false)}>
          <CloseIcon />
        </button> */}
      {/* own collectibles area */}
      <div
        className="mt-4 lg:mt-3 flex flex-col w-[80%] mx-auto overflow-y-auto h-[60vh]  lg:min-h-[32vh] lg:max-h-[32vh] custom-scrollbar  "
        style={{
          position: "relative", // Ensures proper containment
        }}
      >
        <div className=" custom-scrollbar  grid grid-cols-6 lg:grid-cols-9 gap-2 pr-2   ">
          {userNfts.map((item: any, j: number) => (
            <Card
              textsize={"text-[12px]"}
              handleClick={() => {}}
              // selected={selectedNfts.includes(item)}
              onVendingMachine
              // item={
              //   j < userNfts.length
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
      {/* button of Confirm Burn */}
      <div className="flex flex-col justify-center items-center gap-1 w-full mx-auto mt-4">
        <button
          disabled={loading}
          className={`bg-[#F7D05A] py-1 ${
            loading ? "cursor-not-allowed  bg-[#f9e4a2]" : "cursor-pointer"
          }  rounded-shape w-[55%]  font-bold uppercase px-4 rounded-lg ${
            inria_serif_bold.className
          }`}
          onClick={() => {
            handlesubmit();
            // setCollectiblesOpen(false);
          }}
        >
          <p
            className={`${inria_serif_regular.className} text-[10px] leading-none uppercase  whitespace-nowrap`}
          >
            {loading ? "Burning..." : "Confirm Burn"}
          </p>
        </button>
        <p
          className={`${inria_serif_regular.className} text-white text-[8px] uppercase  whitespace-nowrap`}
        >
          *This Action cant be undone*
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-1 w-full mx-auto mt-4">
        <button
          disabled={loading}
          className={`bg-black py-1 rounded-shape w-[55%] border-white border-[1px] rounded-shape font-bold uppercase px-4  ${inria_serif_bold.className}`}
          onClick={() => {
            setCollectiblesOpen(false);
          }}
        >
          <p
            className={`${inria_serif_regular.className} text-white text-[10px] leading-none uppercase  whitespace-nowrap`}
          >
            I dont want to burn
          </p>
        </button>
      </div>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <svg
      width="34"
      height="27"
      viewBox="0 0 34 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <path
        d="M10.1858 0L16.8225 8.52979H17.1065L23.8142 0H33.6451L22.6785 13.5L34 27H23.9207L17.1065 18.3779H16.8225L10.0084 27H0L11.2683 13.5L0.283925 0H10.1858Z"
        fill="black"
      />
    </svg>
  );
};
