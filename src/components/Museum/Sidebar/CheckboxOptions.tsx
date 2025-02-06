import PerfectScrollbar from "react-perfect-scrollbar";

import galleryContext from "@/contexts/GalleryContext";
import { inria_serif_bold, inria_serif_regular } from "@/fonts";
import React from "react";

type MenuOptionsProps = {
  trait: any;
};

export default function CheckboxOptions({
  trait,
}: {
  trait: MenuOptionsProps;
}) {
  const {
    filters: { filters },
    addFilters,
    removeFilters,
  } = React.useContext(galleryContext);
  // @ts-ignore
  const filteredQualities = trait.values;

  const optionsList = React.useMemo(() => {
    return (
      <div
        className="custom-scrollbar"
        style={{
          maxHeight: "140px",
          overflow: "auto",
        }}
      >
        {filteredQualities.length > 0 ? (
          filteredQualities.map(
            (value: { option: string; count: number }, index: number) => {
              return (
                <div
                  key={index}
                  className="custom-scrollbar flex items-center gallery-input"
                >
                  <input
                    id="filter-Mouth-36"
                    name="Mouth[]"
                    type="checkbox"
                    checked={
                      // @ts-ignore
                      !!filters[trait.trait_type]?.includes(value.option)
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        addFilters({
                          isEnum: true,
                          // @ts-ignore
                          traitType: trait.trait_type,
                          value: value.option,
                        });
                        return;
                      }
                      removeFilters({
                        isEnum: true,
                        // @ts-ignore
                        traitType: trait.trait_type,
                        value: value.option,
                      });
                    }}
                    className={`h-5 w-5 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 ${inria_serif_regular.className}`}
                    value=""
                  />
                  <label
                    className={`ml-2 uppercase text-sm pt-1 pb-1 opacity-80 w-full cursor-pointer h-full text-[14px]  leading-none ${inria_serif_regular.className}`}
                  >
                    {value.option}
                    <span
                      className={`"opacity-50 text-[14px] ${inria_serif_bold.className} pl-1 text-sm leading-4"`}
                    >
                      ({value.count})
                    </span>
                  </label>
                </div>
              );
            }
          )
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <h3>No Results Found</h3>
          </div>
        )}
      </div>
    );
  }, [filteredQualities, filters, trait]);
  return <div>{optionsList}</div>;
}
