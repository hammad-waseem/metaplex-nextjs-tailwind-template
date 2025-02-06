"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import ConfirmBurnDetails from "./ConfirmBurnDetails";
import { Nft } from "../../../lib/candy";

export default function ConfirmBurnModal({
  open,
  setCollectiblesOpen,
  isEditing,
  setDisplayPfp,
  userNfts,
  handlesubmit,
  loading,
}: {
  open: boolean;
  setCollectiblesOpen: (value: boolean) => void;
  isEditing?: boolean;
  setDisplayPfp?: (nft: Nft) => void;
  userNfts?: Nft[];
  handlesubmit?: () => void;
  loading?: boolean;
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100000]"
        initialFocus={cancelButtonRef}
        onClose={() => setCollectiblesOpen(false)}
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

        <div className="fixed inset-0 z-40 w-full overflow-y-auto mx-auto">
          <div className="mx-auto flex min-h-full  items-end justify-center lg:p-4 text-center sm:items-center sm:p-0 md:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-none lg:rounded-lg text-left transition-all lg:container">
                <ConfirmBurnDetails
                  setCollectiblesOpen={setCollectiblesOpen}
                  isEditing={isEditing}
                  setDisplayPfp={setDisplayPfp}
                  loading={loading}
                  userNfts={userNfts}
                  handlesubmit={handlesubmit}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
