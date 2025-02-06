"use client";
import searchIcon from "@/assets/search-icon.png";
import galleryContext from "@/contexts/GalleryContext";
import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inria_serif_regular,
} from "@/fonts";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CollapsibleMenu from "./Sidebar/CollapsibleMenu";
import attributeFiltersListTemp from "./attributeFilters.json";
import useDebounce from "@/hooks/useDebounce";
import shuffleIcon from "@/assets/shuffle-icon.svg";
export default function Sidebar() {
  const attributeFiltersList = attributeFiltersListTemp.map((t) => ({
    ...t,
    trait_type: t.trait_type.replace(/ /g, "_"),
  }));
  //sdfsa
  const { addFilters, filters, shuffleNfts } = useContext(galleryContext);

  const [search, setSearch] = useState<string>(filters.searchNftsByName);
  const searchQuery = useDebounce(search, 1000);

  useEffect(() => {
    addFilters({
      isSearch: true,
      searchQuery,
    });
  }, [searchQuery]);

  return (
    <div>
      <div className="py-2 lg:pb-8 pl-5 lg:pl-4 pr-2">
        <div className="flex justify-between  items-center ">
          <h3
            className={`font-extrabold text-black lg:mr-0  text-[33px] lg:text-3xl gray-border  lg:border-b-0 ${inria_serif_extra_bold.className}`}
          >
            FILTERS
          </h3>
          {/* <div className="hidden lg:block">
            <div
              onClick={() => shuffleNfts()}
              className={` flex  border-2 text-xs  py-3 light-border rounded-shape  px-4 items-center gap-3 cursor-pointer  ${inria_serif_bold.className} uppercase pr-4`}
              style={{ borderRadius: "9999px", maxHeight: "30px" }}
            >
              Shuffle
              <Image src={shuffleIcon} alt="shuffleIcon" className="max-w-5" />
            </div>
          </div> */}
        </div>
        {/* tab */}
        {/* <div className="lg:flex gap-4 items-center pr-4 hidden">
          <button className="border-[#C1C1C1] rounded-lg border-2 bg-[#FF9534] font-extrabold text-2xl text-white px-6 py-1">
            pooks.
          </button>
          <button
            disabled
            className="border-[#C1C1C1] rounded-lg border-2 bg-[#DEDEDE] font-extrabold text-2xl text-white px-10 py-1"
          >
            ???
          </button>
        </div> */}

        {/* search bar */}
        <div
          className={`flex p-1 border-[#000000] rounded-xl  light-border mt-4 border-2 bg-[#FFFFFF] bg-opacity-50 items-center `}
          style={{
            borderRadius: "9999px",
          }}
        >
          <Image
            src={searchIcon}
            width={15}
            height={15}
            alt="search-icon"
            className="mx-2"
          />
          <input
            type="number"
            placeholder="SEARCH BY ID"
            style={{
              WebkitAppearance: "textfield",
              //bg transparent
              backgroundColor: "transparent",
            }}
            className={` text-xs text-start py-1  w-full outline-none ${inria_serif_regular.className} appearance-none  placeholder:text-[#505050] placeholder:text-xs   placeholder:font-medium`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full  pt-8">
          <div className="mx-auto w-full">
            {attributeFiltersList
              .filter((f) => f.filter_type === "enum")
              .map((trait, index) => (
                <div
                  className=""
                  style={{
                    //make this div scrollable
                    overflowY: "auto",
                  }}
                >
                  <div key={index} className=" custom-scrollbar">
                    <CollapsibleMenu trait={trait} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
