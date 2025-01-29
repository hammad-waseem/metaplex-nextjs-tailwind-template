"use client";

import {
  inria_serif_bold,
  inria_serif_bold_italic,
  inria_serif_extra_bold,
  inria_serif_light,
  inria_serif_medium,
  inria_serif_regular,
} from "../../../fonts";

import { useEffect, useState } from "react";

import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function MintGuide() {
  const maxlg = useMediaQuery("(max-width: 1023px)");
  const maxSm = useMediaQuery("(max-width: 639px)");

  //chnge body background color
  useEffect(() => {
    document.body.style.backgroundColor = "#EFE6D3";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  }, []);

  return (
    <div className="flex flex-col h-fit   bg-[#EFE6D3] py-14  lg:py-10">
      <div className="lg:w-[75%] xl:w-[70%] 2xl:w-[60%]  items-center justify-center mx-auto py-5 lg:py-14 uppercase w-full lg:px-0 px-2 xs:px-4 ">
        <div className="mx-5 md:mx-0 items-center justify-center">
          <h3
            className={`${inria_serif_regular.className} text-[#7A7A7A] text-center font-black text-[25px] md:text-[40px] leading-none `}
          >
            OKD MINT
          </h3>
          <h3
            className={`${inria_serif_extra_bold.className} text-black text-center font-black text-[40px] md:text-[40px] leading-none `}
          >
            How will this Work?
          </h3>

          <p
            className={`${inria_serif_regular.className} pb-2 text-center text-[15px]`}
          >
            OKD COLLECTION WILL HAVE 3 phases. MINTED ON SOLANA AT [INSERT DATE
            HERE]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
          <div className="bg-[#353434] px-12  sm:px-20  lg:px-8  xl:px-12  py-12 pb-40 ">
            <h5
              className={`${inria_serif_medium.className} text-white text-[15px] leading-none`}
            >
              Phase 1
            </h5>
            <h3
              className={`${inria_serif_extra_bold.className} text-[#F7D05A] leading-none text-[40px]`}
            >
              Presale
            </h3>
            <p
              className={`${inria_serif_bold.className} text-[#F7D05A] text-[15px] py-4 pt-8`}
            >
              400 OKD
            </p>
            <p
              className={`${inria_serif_regular.className} text-white  text-[15px]`}
            >
              AIRDROPPED TO POOKS HOLDERS BASED ON THEIR LEADEBOARD RANKS. THESE
              WILL BE LOCKED UP FOR 3 MONTHS
            </p>

            <p
              className={`${inria_serif_bold.className} text-[#F7D05A] text-[15px] py-4 pt-8`}
            >
              1000 OKD
            </p>
            <p
              className={`${inria_serif_regular.className} text-white  text-[15px]`}
            >
              FCFS RESERVED FOR OG COMMUNITIES & COLLABS TO MINT
            </p>
          </div>
          <div className="bg-[#353434]  p-12 pb-40  ">
            <h5
              className={`${inria_serif_medium.className} text-white text-[15px] leading-none`}
            >
              Phase 2
            </h5>
            <h3
              className={`${inria_serif_extra_bold.className} text-[#F7D05A] leading-none text-[40px]`}
            >
              Public
            </h3>
            <p
              className={`${inria_serif_bold.className} text-[#F7D05A] text-[15px] py-4 pt-8`}
            >
              3500 OKD
            </p>
            <p
              className={`${inria_serif_regular.className} text-white  text-[15px]`}
            >
              FCFS PUBLIC MINT FOR EVERYONE
            </p>
          </div>{" "}
          <div className="bg-[#353434]  p-12 pb-40  ">
            <h5
              className={`${inria_serif_medium.className} text-white text-[15px] leading-none`}
            >
              Phase 3
            </h5>
            <h3
              className={`${inria_serif_extra_bold.className} text-[#F7D05A] leading-none text-[40px]`}
            >
              Burn
            </h3>
            <p
              className={`${inria_serif_bold.className} text-[#F7D05A] text-[15px] py-4 pt-8`}
            >
              1666 OKD
            </p>
            <p
              className={`${inria_serif_regular.className} text-white  text-[15px]`}
            >
              REMAINING SUPPLY RESERVED FOR POOKS TO BE BURNED
              <br />
              <br />
              BURN 3 POOKS TO MINT 1 OKD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
