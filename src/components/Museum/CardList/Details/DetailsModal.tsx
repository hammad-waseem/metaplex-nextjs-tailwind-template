"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Details from ".";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface IDetailsModal {
  nft: any;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function DetailsModal({ nft, open, setOpen }: IDetailsModal) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100000]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-black lg:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full lg:w-screen overflow-y-auto">
          <div className="flex min-h-full  items-end justify-center lg:p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden lg:rounded-xl text-left w-full  transition-all lg:container
              
              
             xl:max-w-[85%]

             2xl:max-w-[66%]


            



              
              
              "
              >
                <Details nft={nft} onCloseModal={() => setOpen(false)} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
