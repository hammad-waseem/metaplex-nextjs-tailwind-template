"use client";

import funelIcon from "@/assets/funel.png";
import shuffleIcon from "@/assets/shuffle-icon.svg";
import galleryContext from "@/contexts/GalleryContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useState } from "react";
import CardList from "./CardList";
import FilterItemList from "./FilterItemList";
import Sidebar from "./Sidebar";
import { inria_serif_bold, inria_serif_regular } from "@/fonts";
import close from "@/assets/X.png";
import NextImage from "next/image";

export default function Museum() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { shuffleNfts, filtersCount, nftsCount } = useContext(galleryContext);

  return (
    <div className="xl:w-[85%] mx-auto my-4 lg:my-5 lg:mx-4 xl:mx-auto xl:my-10 ">
      {/* mobile tab */}
      <div className="flex gap-4 items-center lg:hidden px-4">
        {/* <button className="border-[#C1C1C1] rounded-lg border-2 bg-[#FF9534] font-extrabold text-xl text-white px-6 py-1">
          pooks.
        </button> */}
        {/* <button
          disabled
          className="border-[#C1C1C1] rounded-lg border-2 bg-[#DEDEDE] font-extrabold text-xl text-white px-10 py-1"
        >
          ???
        </button> */}
      </div>
      <div className=" grid grid-cols-12 lg:gap-10 xl:gap-20 relative">
        <div className="col-span-12 lg:col-span-4 hidden lg:grid">
          <Sidebar />
        </div>
        {/* sidebar for mobile */}
        <AnimatePresence>
          {openSidebar && (
            <motion.div
              className="fixed inset-0 bg-[#EFE6D3] bg-opacity-50 z-50"
              // onClick={() => setOpenSidebar(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed inset-y-0 right-0 w-4/5 lg:w-full bg-[#EFE6D3] border-l border-[#f5f3f0] shadow-lg"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-end p-2">
                  <button
                    className="text-black text-3xl font-bold p-2 focus:outline-none focus:bg-gray-200 absolute top-11 right-5"
                    onClick={() => setOpenSidebar(false)}
                  >
                    <NextImage src={close} alt="close" width={15} height={15} />
                  </button>
                </div>
                <div className="pt-16 px-2">
                  <Sidebar />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid col-span-12 lg:col-span-8 lg:px-10 h-fit">
          {/* Museum filter area */}
          <div className="flex justify-between  items-center  lg:flex-row px-4 lg:px-0 w-full xl:w-full max-h-fit ">
            {/* left side items */}
            <div className="flex items-center  mt-3 w-full ">
              <div className="flex flex-col items-start gap-2 ml-2 lg:ml-0 w-full">
                <h4 className="text-lg md:text-xl lg:text-3xl font-black whitespace-nowrap flex w-full">
                  THE MUSEUM
                </h4>

                {/* First Row: The Museum (filters and filter items) */}

                <div className="flex justify-between items-center gap-2 w-full">
                  {/* Left side: Filters heading and Filter Item List */}
                  <div className="flex flex-grow items-start  gap-2 h-3">
                    <div className=" flex flex-grow-0 items-center pt-[2px]  gap-2 ">
                      <h4 className="text-xs text-start font-black flex items-center ">
                        FILTERS
                        <span className="bg-black text-white text-xs font-black rounded-shape px-2 py-1 mx-2">
                          {filtersCount < 10
                            ? "0" + filtersCount
                            : filtersCount}
                        </span>
                      </h4>
                    </div>
                    {/* Filter Items List */}
                    {/* {filtersList} */}
                    <div className=" bg-transparent flex-grow hidden lg:block">
                      <FilterItemList />
                    </div>
                  </div>

                  {/* Right side: NFT Count, Shuffle, and Funnel Button */}
                  <div className="flex flex-grow-0 items-center justify-end gap-1.5 lg:gap-2  lg:mt-0 mr-4 lg:mr-8 pt-[14px]  ">
                    {/* NFT Count */}
                    <h3 className="hidden lg:flex text-xs lg:text-lg font-black mr-3 lg:mr-2 leading-none text-center justify-center">
                      {nftsCount === 4999 ? nftsCount + 1 : nftsCount}
                    </h3>
                    <h4 className="text-xs font-black lg:hidden">
                      {nftsCount === 4999 ? nftsCount + 1 : nftsCount}
                    </h4>

                    {/* Shuffle Button */}
                    <div
                      onClick={() => shuffleNfts()}
                      className={`flex light-border py-1 px-3 text-[12px] items-center gap-3 cursor-pointer rounded-shape ${inria_serif_regular.className} uppercase`}
                    >
                      <p className="hidden lg:block">Shuffle</p>
                      <Image
                        src={shuffleIcon}
                        alt="shuffleIcon"
                        className="max-w-4"
                      />
                    </div>

                    {/* Filter Sidebar Button */}
                    <div
                      onClick={() => setOpenSidebar(true)}
                      className="flex rounded-shape bg-[#F7D05A] border-black border-[1px] rounded-md py-1 px-3 items-center gap-3 cursor-pointer lg:hidden"
                    >
                      <Image
                        src={funelIcon}
                        alt="funelIcon"
                        className="max-w-4"
                      />
                    </div>
                  </div>
                </div>
                {/* {filtersList} */}

                {/* {filtersList} */}
              </div>

              {/* right side items */}
            </div>
          </div>

          <CardList classes="max-h-[800px] md:max-h-[1150px] lg:max-h-[800px] lg:min-h-[800px]" />
        </div>
      </div>
    </div>
  );
}
