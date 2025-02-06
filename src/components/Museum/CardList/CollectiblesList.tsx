"use client";

import { useState } from "react";
import DetailsModal from "./Details/DetailsModal";
import Card from "./Card";
import { Nft } from "@/store/types";
import { on } from "events";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CollectiblesList({
  classes,
  nfts,
  isEditing,
  displayPfp,
  selectedPfp,
  projectPfp,
  setDisplayPfp,
  // heightWidth,
  onProfile,
  setCollectiblesOpen,
  collectiblesOpen,
}: {
  classes: string;
  nfts: Nft[];
  isEditing?: boolean;
  selectedPfp?: Nft;
  displayPfp?: Nft;
  projectPfp?: string;
  setDisplayPfp?: (nft: Nft) => void;
  setCollectiblesOpen?: (value: boolean) => void;
  collectiblesOpen?: boolean;
  onProfile?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeNft, setActiveNft] = useState<Nft | null>(null);

  //if the screen is large
  const largeScreen = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1500px)"
  );

  const extraCount = largeScreen ? nfts.length - 3 : nfts.length - 4;

  //if large screen nft to display is 3 else 4
  const nftToDisplay = largeScreen ? 3 : 4;

  const islesstheSmallScreen = useMediaQuery("(max-width: 575px)");

  if (onProfile) {
    return (
      <div
        id="profile-collectibles-list"
        className={
          isEditing
            ? `grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-12 xl:grid-cols-8 gap-2 mt-6 lg:mt-2 lg:min-w-full overflow-y-auto overflow-x-hidden custom-scrollbar p-1 ${
                classes.includes("phone") ? " h-[35rem] no-scrollbar" : ""
              }`
            : ` 
            flex justify-between

            ${
              onProfile && !collectiblesOpen && islesstheSmallScreen
                ? "grid grid-cols-6 "
                : " flex justify-between"
            }
            
            gap-2 mt-2 lg:mt-2  lg:min-w-full overflow-hidden custom-scrollbar p-1 justify-self-end`
        }
      >
        {isEditing
          ? nfts.map((item, j) => (
              <Card
                textsize={
                  onProfile && !collectiblesOpen ? "text-sm" : "text-xl"
                }
                handleClick={() => {
                  if (isEditing) {
                    setDisplayPfp && setDisplayPfp(item);
                    return;
                  }
                }}
                selected={
                  // isEditing
                  //   ? displayPfp?.explorerId === item?.explorerId
                  //   : selectedPfp
                  //   ? selectedPfp.explorerId === item?.explorerId
                  //   : projectPfp ===
                  //     `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  j < nfts.length
                    ? {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                    : null
                }
                onProfile={onProfile}
                key={j}
              />
            ))
          : nfts?.length < 4 && classes.includes("phone")
          ? Array.from({ length: 4 }, (_, i) => nfts[i]).map((item, j) => (
              <Card
                textsize={
                  onProfile && !collectiblesOpen ? "text-sm" : "text-xl"
                }
                handleClick={() => {
                  if (item) {
                    if (isEditing) {
                      setDisplayPfp && setDisplayPfp(item);
                      return;
                    }
                    setOpen(!open);
                    setActiveNft(item);
                  }
                }}
                selected={
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  j < nfts.length
                    ? {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                    : null
                }
                onProfile={onProfile}
                key={j}
              />
            ))
          : classes.includes("phone")
          ? nfts?.slice(0, 4).map((item, i) => (
              <Card
                textsize={
                  onProfile && !collectiblesOpen ? "text-sm" : "text-xl"
                }
                handleClick={
                  i < 3
                    ? () => {
                        if (isEditing) {
                          setDisplayPfp && setDisplayPfp(item);
                          return;
                        }
                        setOpen(!open);
                        setActiveNft(item);
                      }
                    : () => {
                        setCollectiblesOpen(!collectiblesOpen);
                      }
                }
                onProfile={onProfile}
                selected={
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  i >= 3
                    ? nfts.length === 4 && i === 3
                      ? {
                          imageUrl: item.image,
                          name: item.name,
                          explorerId: item.explorerId,
                          stakingPoints: item.stakingPoints,
                        }
                      : null
                    : {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                }
                extraCount={extraCount}
                key={i}
              />
            ))
          : nfts?.length < nftToDisplay
          ? Array.from({ length: nftToDisplay }, (_, i) => nfts[i]).map(
              (item, j) => (
                <Card
                  textsize={
                    onProfile && !collectiblesOpen ? "text-sm" : "text-xl"
                  }
                  handleClick={() => {
                    if (item) {
                      if (isEditing) {
                        setDisplayPfp && setDisplayPfp(item);
                        return;
                      }
                      setOpen(!open);
                      setActiveNft(item);
                    }
                  }}
                  selected={
                    isEditing &&
                    (displayPfp
                      ? displayPfp?.explorerId === item?.explorerId
                      : selectedPfp
                      ? selectedPfp?.explorerId === item?.explorerId
                      : projectPfp ===
                        `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                  }
                  item={
                    j < nfts.length
                      ? {
                          imageUrl: item.image,
                          name: item.name,
                          explorerId: item.explorerId,
                          stakingPoints: item.stakingPoints,
                        }
                      : null
                  }
                  onProfile={onProfile}
                  key={j}
                />
              )
            )
          : nfts?.slice(0, nftToDisplay).map((item, i) => (
              <Card
                handleClick={
                  i < nftToDisplay - 1 ||
                  (nfts.length === nftToDisplay && i === nftToDisplay - 1)
                    ? () => {
                        if (isEditing) {
                          setDisplayPfp && setDisplayPfp(item);
                          return;
                        }
                        setOpen(!open);
                        setActiveNft(item);
                      }
                    : () => {
                        setCollectiblesOpen(!collectiblesOpen);
                      }
                }
                textsize={
                  onProfile && !collectiblesOpen ? "text-sm" : "text-xl"
                }
                onProfile={onProfile}
                selected={
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  i >= nftToDisplay - 1
                    ? nfts.length === nftToDisplay && i === nftToDisplay - 1
                      ? {
                          imageUrl: item.image,
                          name: item.name,
                          explorerId: item.explorerId,
                          stakingPoints: item.stakingPoints,
                        }
                      : null
                    : {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                }
                extraCount={extraCount}
                key={i}
              />
            ))}

        <DetailsModal nft={activeNft} open={open} setOpen={setOpen} />
      </div>
    );
  } else {
    return (
      <div
        className={` grid grid-cols-12 lg:grid-cols-10 gap-4 mt-6 lg:mt-2 overflow-x-hidden custom-scrollbar lg:pl-0 lg:min-w-full pr-2 ${classes}`}
      >
        {nfts?.length < 5
          ? Array.from({ length: 5 }, (_, i) => nfts[i]).map((item, j) => (
              <Card
                handleClick={() => {
                  if (item) {
                    if (isEditing) {
                      setDisplayPfp && setDisplayPfp(item);
                      return;
                    }
                    setOpen(!open);
                    setActiveNft(item);
                  }
                }}
                selected={
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  j < nfts.length
                    ? {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                    : null
                }
                onProfile={onProfile}
                key={j}
              />
            ))
          : nfts?.slice(0, 5).map((item, i) => (
              <Card
                handleClick={
                  i < 4 || (nfts.length === 5 && i === 4)
                    ? () => {
                        if (isEditing) {
                          setDisplayPfp && setDisplayPfp(item);
                          return;
                        }
                        setOpen(!open);
                        setActiveNft(item);
                      }
                    : () => {
                        setCollectiblesOpen(!collectiblesOpen);
                      }
                }
                onProfile={true}
                selected={
                  isEditing &&
                  (displayPfp
                    ? displayPfp?.explorerId === item?.explorerId
                    : selectedPfp
                    ? selectedPfp?.explorerId === item?.explorerId
                    : projectPfp ===
                      `https://pooks-nfts.s3.us-east-2.amazonaws.com/mainnet-alpha/${item?.explorerId}.png`)
                }
                item={
                  i >= 4
                    ? nfts.length === 5 && i === 4
                      ? {
                          imageUrl: item.image,
                          name: item.name,
                          explorerId: item.explorerId,
                          stakingPoints: item.stakingPoints,
                        }
                      : null
                    : {
                        imageUrl: item.image,
                        name: item.name,
                        explorerId: item.explorerId,
                        stakingPoints: item.stakingPoints,
                      }
                }
                extraCount={extraCount}
                key={i}
              />
            ))}

        <DetailsModal nft={activeNft} open={open} setOpen={setOpen} />
      </div>
    );
  }
}
