"use client";

import galleryContext from "@/contexts/GalleryContext";
import { inria_serif_bold, inria_serif_regular } from "@/fonts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCallback, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import DetailsModal from "./Details/DetailsModal";
import FilterItemList from "../FilterItemList";

export default function CardList({ classes }: { classes: string }) {
  const mid = useMediaQuery("(max-width: 821px)");
  const [open, setOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);

  const {
    nfts,
    nftsFetching,
    currentPage,
    lastPage,
    fetchNextNfts,
    filters,
    nftsCount,
    filtersCount,
    clearFilters,
  } = useContext(galleryContext);

  const handleShowNftDescriptionModal = useCallback((nft: any) => {
    setSelectedNft(nft);
    setOpen(!open);
  }, []);

  return (
    <div
      id="scrollableDiv"
      className={`custom-scrollbar nft-items-list-wrap control-items-width mt-6 relative overflow-y-auto pr-5 pl-5 lg:pl-0 lg:min-w-full ${classes} 
      
      `}
    >
      <div
        className={`flex lg:hidden justify-between items-center ml-1 mb-4  ${
          nfts?.length > 0 ? "" : "mr-2.5"
        } `}
      >
        <FilterItemList />
      </div>
      {nftsFetching ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <InfiniteScroll
          className="relative"
          scrollableTarget="scrollableDiv"
          dataLength={nfts.length}
          next={fetchNextNfts}
          // next={() => {}}
          hasMore={currentPage < lastPage || currentPage !== lastPage}
          loader={
            <div className="lds-dual-ring absolute z-10 left-[39%] lg:left-[46%] bottom-2"></div>
          }
          endMessage={
            nfts.length > 5 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "Burbank Big Condensed",
                  letterSpacing: "0.5px",
                }}
              >
                <b>
                  {/* Yay! You have seen it all, <br /> no more items Found */}
                </b>
              </p>
            )
          }
        >
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-4 p-1">
            {(filtersCount > 1 && nftsCount === 0) ||
            (filters.searchNftsByName && nftsCount === 0) ? (
              <div className="col-span-12 text-center h-[60vh] items-center flex flex-col justify-center">
                <h3
                  className={`${inria_serif_bold.className} text-lg opacity-50 uppercase`}
                >
                  No Pooks matched your filter parameters.
                </h3>

                <button
                  className={`${inria_serif_regular.className} uppercase  light-border rounded-shape px-6 py-1 rounded-md bg-black text-white transition-all ease-linear duration-75 mt-2 opacity-70 hover:opacity-80`}
                  onClick={() => clearFilters()}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              nfts?.map((item, i) => (
                <Card
                  selected={false}
                  handleClick={() => handleShowNftDescriptionModal(item)}
                  item={item}
                  key={i}
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      )}
      <DetailsModal nft={selectedNft} open={open} setOpen={setOpen} />
    </div>
  );
}
