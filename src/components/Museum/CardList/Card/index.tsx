"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import darkImage from "@/assets/dark.jpg";
import { inria_serif_bold } from "../../../../../fonts";
import { useMediaQuery } from "../../../../../hooks/useMediaQuery";
interface ICard {
  item?: ICardItem;
  textsize?: string;
  selected?: boolean;
  handleClick: () => void;
  // heightWidth?: number;
  onProfile?: boolean;
  extraCount?: number;
  onVendingMachine?: boolean;
}
export interface ICardItem {
  imageUrl: string;
  name: string;
  explorerId: string | number;
  stakingPoints?: number;
}

export default function Card({
  item,
  textsize,
  selected,
  handleClick,
  // heightWidth,
  onProfile,
  extraCount,
  onVendingMachine,
}: ICard) {
  const sm = useMediaQuery("(max-width: 768px)");
  const lg = useMediaQuery("(max-width: 1120px)");
  const xl = useMediaQuery("(min-width: 1121px");

  // console.log("item", item);

  return (
    <motion.div
      className={`cursor-pointer col-span-3 lg:col-span-3 
        ${
          onProfile
            ? " lg:col-span-2 xl:col-span-2"
            : "lg:col-span-3 xl:col-span-3"
        }`}
      onClick={handleClick}
    >
      <motion.div className="bg-transparent relative hover:scale-[102%] transition-transform duration-200 delay-50   rounded-xl light-border  flex justify-center items-center ">
        <Image
          src={onVendingMachine ? item?.imageUrl! : darkImage}
          width={lg ? 750 : xl ? 750 : 233}
          height={lg ? 750 : xl ? 750 : 233}
          alt="img"
          className={`rounded-xl border-[1px] border-white border-opacity-30   ${
            selected && `filter  brightness-[30%] `
          }`}
        />
        {selected && (
          <span
            className={`${inria_serif_bold.className}   uppercase absolute  ${
              onVendingMachine ? "lg:text-md" : "lg:text-md xl:text-lg"
            } font-black bg-black/0.5 text-white`}
          >
            Selected
          </span>
        )}
        {!item && extraCount && (
          <span className="absolute text-[15px] md:text-[18px]  font-black bg-black/0.5 text-white">
            +{extraCount}
          </span>
        )}
      </motion.div>

      {item && (
        <>
          {/* <h4 className="text-primary font-extrabold text-xs text-center mt-2">
            pooks
          </h4> */}
          <h5
            className={`${
              textsize ? textsize : "text-lg"
            } font-extrabold text-center mt-2  ${
              onVendingMachine ? "text-white" : "text-black"
            } ${inria_serif_bold.className}`}
          >
            #
            {onVendingMachine
              ? item?.name?.split("pooks")[1]
              : item?.name?.split("#")[1]}
          </h5>
          {/* {onProfile && (
            <div className="text-xs font-extrabold text-center text-[#787878]">
              TOTAL - {item.stakingPoints} pts
            </div>
          )} */}
        </>
      )}
    </motion.div>
  );
}
