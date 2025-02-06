import { Disclosure } from "@headlessui/react";
import CheckboxOptions from "./CheckboxOptions";
import {
  inria_serif_bold,
  inria_serif_extra_bold,
  inter_extra_bold,
} from "@/fonts";

interface MenuProps {
  handleChange?: any;
  trait: any;
}

export default function CollapsibleMenu(props: MenuProps) {
  const { trait } = props;

  return (
    <div>
      <Disclosure
        as={"div"}
        className="border-b-[1px] border-b-[#000000] lg:pb-3 lg:mb-3 pb-2 mb-2"
      >
        {({ open }) => (
          <div className="custom-scrollbar">
            <Disclosure.Button className="flex w-full justify-between focus:outline-none text-center align-middle  items-center">
              <span
                className={`text-lg lg:text-xl  font-black uppercase ${inria_serif_extra_bold.className} !font-extrabold `}
              >
                {trait.trait_type.includes("_")
                  ? trait.trait_type.split("_")[0] +
                    " " +
                    trait.trait_type.split("_")[1]
                  : trait.trait_type}
              </span>

              <div className="mt-2 lg:mt-0"> {open ? minusIcon : plusIcon}</div>
            </Disclosure.Button>
            <Disclosure.Panel className="custom-scrollbar pb-1 pt-1 text-sm text-gray-500 ">
              {trait.filter_type == "enum" && <CheckboxOptions trait={trait} />}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

const plusIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.34091 11.3466V0.835227H7.52273V11.3466H4.34091ZM0.676136 7.68182V4.5H11.1875V7.68182H0.676136Z"
      fill="black"
    />
  </svg>
);

const minusIcon = (
  <svg
    width="8"
    height="4"
    viewBox="0 0 8 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.15341 0.727273V3.68182H0.335227V0.727273H7.15341Z"
      fill="black"
    />
  </svg>
);
