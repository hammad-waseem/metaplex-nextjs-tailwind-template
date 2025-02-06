import galleryContext from "@/contexts/GalleryContext";
import { inria_serif_bold, inria_serif_regular } from "@/fonts";
import { useContext, useMemo } from "react";
import NextImage from "next/image";
import closeIcon from "@/assets/X.png";

export default function FilterItemList() {
  const { filters, removeFilters, addFilters } = useContext(galleryContext);

  const objArray = [];

  Object.keys(filters.filters).forEach((key) =>
    objArray.push({
      traitType: key,
      values: filters.filters[key],
    })
  );

  // console.log("filter object", objArray);

  const filtersList = useMemo(
    () =>
      objArray.map((filters, index) => {
        return (
          Array.isArray(filters.values) &&
          filters.values?.length > 0 &&
          filters.values.map((value, index) => {
            return (
              <div
                onClick={() => {
                  removeFilters({
                    isEnum: true,
                    traitType: filters.traitType,
                    value: value,
                  });
                }}
                key={index}
                className=" uppercase rounded-shape light-border flex rounded-md py-[2px] lg:py-1 px-3 lg:px-4 lg:pr-6 items-center gap-7 whitespace-nowrap cursor-pointer custom-scrollbar"
              >
                <span
                  className={`text-black text-[12px] ${inria_serif_regular.className}`}
                >
                  {filters.traitType} - {value}
                </span>
                <NextImage
                  src={closeIcon}
                  alt="close"
                  width={10}
                  height={10}
                  className="cursor-pointer"
                />
              </div>
            );
          })
        );
      }),
    [filters.filters]
  );

  const SearchQuery = useMemo(() => {
    return filters.searchNftsByName ? (
      <div
        onClick={() =>
          addFilters({
            isSearch: true,
            searchQuery: "",
          })
        }
        className=" uppercase rounded-shape light-border flex rounded-md py-[2px] lg:py-1 px-3 lg:px-4 lg:pr-6 items-center gap-7 whitespace-nowrap cursor-pointer custom-scrollbar"
      >
        <span
          className={`text-black text-[12px] ${inria_serif_regular.className}`}
        >
          ID - #{filters.searchNftsByName}
        </span>
        <NextImage
          src={closeIcon}
          alt="close"
          width={10}
          height={10}
          className="cursor-pointer"
        />
      </div>
    ) : (
      <></>
    );
  }, [filters.searchNftsByName]);

  return (
    <div
      // className="hide-scrollbar overflow-x-auto max-w-[60vw] lg:max-w-[650px]"
      className="scroll-container  control-scroll-width   "
      style={{
        overflowX: "auto",
        display: "flex",
        flexWrap: "nowrap",
        gap: "10px",
        paddingBottom: "12px",
        zIndex: 100,
      }}
    >
      {SearchQuery}
      {filtersList}
    </div>
  );
}
