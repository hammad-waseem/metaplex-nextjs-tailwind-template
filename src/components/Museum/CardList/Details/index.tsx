"use client";

import arrowDown from "@/assets/arrow-down.png";
import closeIcon from "@/assets/X.png";
import downloadIcon from "@/assets/download-icon.png";
import magicEdenIcon from "@/assets/magic-eden.png";
import tensorIcon from "@/assets/tensor.png";
import galleryContext from "@/contexts/GalleryContext";
import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inria_serif_regular,
} from "@/fonts";
import { s3Url, s3UrlNoBackground } from "@/utils/ImageUrl";
import { Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Details({
  nft,
  onCloseModal,
}: {
  nft: any;
  onCloseModal: () => void;
}) {
  const owner = nft.owner;
  const { getRankById } = useContext(galleryContext);
  const pathName = usePathname();

  const data_url = `https://mainnet.helius-rpc.com/?api-key=3cf0a5a1-f18c-4e2b-b9cd-e9a8df993a1a`;

  const max380 = useMediaQuery("(max-width: 380px)");

  // const getAssetBatch = async () => {
  //   const response = await fetch(data_url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       jsonrpc: "2.0",
  //       id: "my-id",
  //       method: "getAssetBatch",
  //       params: {
  //         ids: [nft.mint],
  //       },
  //     }),
  //   });
  //   const { result } = await response.json();
  //   // console.log("Assets: ", result);
  //   setOwner(result[0].ownership.owner);
  // };

  // useEffect(() => {
  //   getAssetBatch();
  // }, [nft]);

  const rankInfo: any = getRankById(nft.explorerId);

  // const downloadImage = () => {
  //   const a = document.createElement("a");
  //   a.href = nft.imageUrl;
  //   a.download = nft.name || "image"; // Set the filename for the downloaded file, default is 'image'
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  // const downloadImage = () => {
  //   fetch(nft.imageUrl, {
  //     headers: {
  //       "Content-Type": "application/octet-stream",
  //     },
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(new Blob([blob]));
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = nft.name || "image"; // Set the filename for the downloaded file, default is 'image'
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading image:", error);
  //     });
  // };

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.download = nft.name;

  //   link.href = nft.imageUrl;

  //   link.click();
  // };

  function handleDownloadClick(imageUrl, fileName) {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName || "image";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  }

  const settings = {
    dots: true,
    infinite: true,
    nextArrow: <></>,
    prevArrow: <></>,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // action button area
  const ActionButtons = (
    <div className="scale-90 md:scale-100 -mr-2 md:mr-0">
      {pathName !== `/profile/${nft.owner}` && (
        <Link target="_blank" href={`/profile/${nft.owner}`}>
          <button
            className={`flex justify-between gap-0 lg:gap-5 items-center bg-[#B8B8B8] border-2 gray-border px-2 lg:px-5 py-1 lg:py-2  rounded-md lg:rounded-lg ${inria_serif_bold.className} w-full text-xs lg:text-base`}
          >
            Owner Profile
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464467C7.97631 0.269205 7.65973 0.269205 7.46447 0.464467C7.2692 0.659729 7.2692 0.976311 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM-4.37114e-08 4.5L11 4.5L11 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
                fill="black"
              />
            </svg>
          </button>
        </Link>
      )}
    </div>
  );

  const marketplaceLinks = (
    <div>
      <div className="flex justify-between gap-1 lg:gap-2 items-center  md:scale-100  md:mr-0">
        <motion.a
          href={`https://magiceden.io/item-details/${nft.mint}`}
          target="_blank"
          // rel="nore"

          className="light-border rounded-full  h-7 w-7 lg:h-7 lg:w-7 p-1 transition hover:delay-75 duration-200 hover:scale-110 ease-in-out  inline-flex items-center justify-center cursor-pointer"
        >
          <NextImage objectFit="contain" src={magicEdenIcon} alt="magiceden" />
        </motion.a>
        <motion.a
          href={`https://www.tensor.trade/item/${nft.mint}`}
          target="_blank"
          className="light-border rounded-full border-2  h-7 transition hover:delay-75 duration-200 hover:scale-110 w-7 lg:h-7 lg:w-7 p-1 inline-flex items-center justify-center cursor-pointer"
        >
          <NextImage objectFit="contain" src={tensorIcon} alt="tensoricon" />
        </motion.a>
        {/* <motion.p
          // href={``}
          whileHover={{ scale: 1.1 }}
          className=" gray-border rounded-full border-2 lg:h-12 lg:w-12 h-7 w-7 xl:p-1 md:inline-flex items-center justify-center cursor-pointer font-black bg-slate-500 text-white text-lg text-center xl:text-2xl"
        >
          ?
        </motion.p> */}
      </div>
    </div>
  );

  return (
    <div className="border-none">
      <div className=" mx-auto rounded-none  lg:rounded-3xl py-10 md:py-0    bg-[#EFE6D3] grid grid-cols-12  relative h-[100vh] lg:h-fit overflow-y-auto lg:overflow-y-hidden">
        {/* modal close icon */}
        {/* <svg
          onClick={onCloseModal}
          className="absolute right-5 top-16 mt-2 xl:right-10 xl:top-10 z-10 cursor-pointer"
          width="20"
          height="18"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.99582 0L4.94781 2.52734H5.03132L7.00418 0H9.89562L6.67015 4L10 8H7.03549L5.03132 5.44531H4.94781L2.94363 8H0L3.3142 4L0.0835073 0H2.99582Z"
            fill="#000"
          />
        </svg>
        //close icon */}
        <button
          className="absolute right-6 top-6 z-10 cursor-pointer"
          onClick={onCloseModal}
        >
          <NextImage src={closeIcon} alt="close-icon" />
        </button>
        <div
          className="block 
        height-full
           lg:hidden min-[400px]:m-4 md:px-12 px-4 col-span-12 lg:col-span-5 pt-8 sm:pt-0 xl:pt-0 items-end justify-end"
        >
          <div className="  border-b-[1px]  border-black  lg:p-0 overflow-hidden flex-grow flex items-end ">
            <NextImage
              className="!rounded-lg shadow-sm px-8 md:px-16"
              src={s3Url(nft.explorerId)}
              height={1000}
              width={1000}
              alt="img"
            />
          </div>
        </div>
        <div className="col-span-12 items-end justify-end lg:col-span-7  min-[400px]:mx-3 lg:mx-4 mb-10 lg:mb-0 p-4">
          <div className=" md:px-10 md:pt-10 lg:px-12 lg:pt-12 ">
            <div className="flex flex-col h-full justify-between lg:gap-6 xl:gap-14">
              {/* Traits area */}
              <div className="w-full pt-0">
                <div className="flex justify-between align-bottom items-end pb-4 border-b-[1px] border-black mb-8">
                  <div className="lg:hidden flex items-end gap-1 md:gap-4">
                    <div className="">
                      <h4
                        className={`text-primary font-extrabold  text-[15px] uppercase !text-[#7B7B7B] whitespace-nowrap  ${inria_serif_extra_bold.className} leading-none`}
                      >
                        Rank {rankInfo?.rank}
                      </h4>
                      <h4
                        className={`font-extrabold text-4xl leading-none ${inria_serif_extra_bold.className}`}
                      >
                        #{nft?.name?.split("#")[1]}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-grow min-[320px]:flex-col lg:flex-col ">
                    <h3 className=" uppercase text-xl lg:text-xl font-extrabold leading-none hidden lg:block text-[#7B7B7B]">
                      Rank {rankInfo?.rank}
                    </h3>
                    <h5
                      className={`font-bold italic text-4xl leading-none ${inria_serif_extra_bold.className} hidden lg:block`}
                    >
                      {/* @ts-ignore */}

                      <a href={rankInfo?.link} target="_blank">
                        #{nft?.name?.split("#")[1]}
                      </a>
                    </h5>
                  </div>

                  <div className="flex justify-end">
                    <div className="w-full xl:flex-row md:flex-col xl:flex xl:items-end lg:items-end justify-end hidden lg:flex gap-2">
                      <div className="flex gap-3 items-end items-left">
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
                    </div>

                    <div
                      className={`justify-center  flex gap-1 lg:gap-2 ${
                        max380 ? "items-end flex-col " : " items-center   "
                      }   `}
                    >
                      {marketplaceLinks}
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div className="flex items-center gap-2 justify-center">
                          <Menu.Button
                            className={` leading-none uppercase transition hover:delay-75 duration-200 hover:bg-[#FFDF8E] flex justify-between gap-0 lg:gap-5 items-center text-center bg-[#F7D05A] border-2 light-border px-5 py-2 rounded-shape ${inria_serif_regular.className}  w-full text-[10px]  outline-none

                        whitespace-nowrap 
                        `}
                            style={{
                              borderRadius: "9999px",
                              minWidth: "150px",
                              maxHeight: "50px",
                            }}
                          >
                            Download Asset
                            <NextImage
                              src={arrowDown}
                              alt="arrow down"
                              className="ml-2"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute lg:left-0 z-10 mt-2  w-full origin-top-right bg-[#F7D05A] shadow-lg light-border rounded-lg gray-border px-3 p-2 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleDownloadClick(
                                        s3Url(nft.explorerId),
                                        `${nft.name}.png`
                                      )
                                    }
                                    className={`uppercase w-full text-[10px]   font-bold border-b-[1px] cursor-pointer px-1 lg:px-2 pb-2 mb-1  hover:text-[#7C7C7C] transition hover:delay-75 duration-200 lg:mb-3 border-black ${inria_serif_regular.className} flex justify-between items-center`}
                                  >
                                    With Background
                                    {/* <NextImage
                                    src={downloadIcon}
                                    alt="download"
                                  /> */}
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleDownloadClick(
                                        s3UrlNoBackground(nft.explorerId),
                                        `${nft.name}-alpha.png`
                                      )
                                    }
                                    // href={nft.imageUrl}
                                    // download={`${nft?.name}.jpg`}
                                    className={`uppercase w-full text-[10px]  font-bold  cursor-pointer px-1 lg:px-2  hover:text-[#7C7C7C]  transition hover:delay-75 duration-200 ${inria_serif_regular.className} flex justify-between items-center`}
                                  >
                                    No Background
                                    {/* <NextImage
                                    src={downloadIcon}
                                    alt="download"
                                  /> */}
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* <div className="lg:hidden flex items-center justify-center gap-3">
                    {ActionButtons}
                  </div> */}
                </div>

                <div
                  className="grid grid-cols-1 xl:grid-cols-2  gap-2 lg:h-[115px]  overflow-hidden overflow-y-auto"
                  style={{
                    //hide scrollbar
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {nft.attributes.map((attribute) => (
                    <div key={attribute._id}>
                      <div className="px-7  flex flex-col  gap-0.5  py-3 light-border bg-white  rounded-xl">
                        <h3
                          className={`text-[13px] font-extrabold leading-none ${inria_serif_bold.className} uppercase leading-none`}
                        >
                          {attribute.trait_type}
                        </h3>
                        <h5
                          className={`font-bold italic text-[11px] leading-none ${inria_serif_regular.className} text-[#747474] uppercase leading-none whitespace-nowrap`}
                        >
                          {attribute.value}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="block lg:hidden mb-5">
                  <h5
                    className={`-mt-4 hidden font-bold text-right italic text-xl mb-2 leading-none ${inria_serif_bold.className} lg:block`}
                  >
                    {/* @ts-ignore */}
                    Rank{" "}
                    <a href={rankInfo?.link} target="_blank">
                      {rankInfo?.rank}
                    </a>
                  </h5>
                  {/* <Slider {...settings}>

                    
                    <div className="grid grid-cols-12 lg:gap-4">
                      {nft.attributes
                        .slice(0, Math.ceil(nft.attributes.length / 2))
                        .map((attribute) => (
                          <div
                            key={attribute._id}
                            className="col-span-12 lg:col-span-6 bg-white border-black"
                          >
                            <div className="flex flex-col gap-1 pb-2 border-b-2 gray-border mb-4">
                              <h3 className="text-lg lg:text-xl font-extrabold leading-none">
                                {attribute.trait_type}
                              </h3>
                              <h5
                                className={`font-bold italic text-sm lg:text-[16px] leading-none ${inria_serif_bold.className}`}
                              >
                                {attribute.value}
                              </h5>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-12 lg:gpa-2 xl:gap-4">
                      {nft.attributes
                        .slice(
                          Math.ceil(nft.attributes.length / 2),
                          nft.attributes.length
                        )
                        .map((attribute) => (
                          <div
                            key={attribute._id}
                            className="col-span-12 lg:col-span-6"
                          >
                            <div className="flex flex-col gap-1 pb-2 border-b-2 gray-border mb-4">
                              <h3 className="text-lg lg:text-xl font-extrabold leading-none">
                                {attribute.trait_type}
                              </h3>
                              <h5
                                className={`font-bold italic text-sm lg:text-[16px] leading-none ${inria_serif_bold.className}`}
                              >
                                {attribute.value}
                              </h5>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Slider> */}
                </div>
              </div>

              {/* marketplace links area */}

              <div className=" w-full xl:flex-row md:flex-col xl:flex xl:items-end lg:items-start justify-between  lg:flex gap-4">
                <div className="w-full">
                  <div
                    className={`px-8 py-2 text-xl flex justify-between gap-3 border-2  light-border w-full ${inria_serif_bold.className}`}
                    style={{
                      borderRadius: "9999px",
                    }}
                  >
                    <div>
                      <h3
                        className={`text-black uppercase text-[13px] ${inria_serif_bold.className} uppercase leading-none`}
                      >
                        Badges
                      </h3>
                      <h3
                        className={`text-[#757575] text-[10px] uppercase leading-none ${inria_serif_regular.className}`}
                      >
                        100 Points
                      </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      {/* <h3 className="text-[#757575]">100 PTS/DAY</h3> */}
                    </div>
                  </div>
                  <div
                    className={`px-8 mt-2 py-2 text-xl flex justify-between gap-3 border-2 light-border w-full ${inria_serif_bold.className} bg-[#F7D05A] hover:bg-[#FFDF8E] transition hover:delay-75 duration-200`}
                    style={{
                      borderRadius: "9999px",
                    }}
                  >
                    <div className="flex gap-2 items-center ">
                      <div>
                        <h4
                          className={`${inria_serif_bold.className} text-[13px] uppercase leading-none`}
                        >
                          COLLECTOR{" "}
                        </h4>
                        <h5
                          id="tooltip-id2"
                          data-tooltip-variant="light"
                          className={`text-[#7A7A7A] ${inria_serif_regular.className} text-[10px] leading-none uppercase 
                          transition hover:delay-75 duration-200  
                          `}
                          data-tooltip-content={owner?.toString()}
                        >
                          {/* 9uBfdooWZ.....Qy3 */}
                          {owner.slice(0, 9)}.....
                          {owner.slice(-3)}
                        </h5>
                      </div>
                    </div>

                    <Link target="_blank" href={`/profile/${nft.owner}`}>
                      <button
                        className={`whitespace-nowrap h-full uppercase flex justify-between gap-0 lg:gap-5 items-center  px-2    rounded-md lg:rounded-lg ${inria_serif_regular.className} w-full text-[10px]`}
                      >
                        {"View Profile"}
                        {"    "}
                        {" >"}
                      </button>
                    </Link>
                  </div>
                  <h3
                    className={`pt-4 !font-semibold flex justify-center items-center ${inria_serif_regular.className} uppercase text-[11px]`}
                  >
                    Holding Since March 2024
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block col-span-12 lg:col-span-5 pt-8 sm:pt-0 xl:pt-0 items-end justify-end">
          <div className="!rounded-3xl w-full h-full  p-4  lg:p-0 overflow-hidden flex-grow flex items-end">
            <NextImage
              className="!rounded-3xl  object-cover h-full w-auto "
              src={s3Url(nft.explorerId)}
              height={1000}
              width={1000}
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
