import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { inria_serif_bold, inria_serif_regular, inter_bold } from "../../fonts";
import arrowDown from "@/assets/arrow-down-white.png";
import NextImage from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletButton({
  showLeaderBoard = false,
  showProfile = false,
  onVendingMachine = false,
}) {
  const wallet = useWallet();
  const router = useRouter();

  const { setVisible, visible } = useWalletModal();

  //define screen with max width 400 px
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px) ");

  const isSmallScreen = useMediaQuery(
    "(min-width: 401px) and (max-width: 640px)"
  );

  useEffect(() => {
    try {
      if (visible) {
        console.log(
          document.getElementsByClassName("wallet-adapter-modal-title")
        );
        setTimeout(() => {
          document.getElementsByClassName(
            "wallet-adapter-modal-title"
          )[0].innerHTML = "CONNECT A WALLET TO CONTINUE";
        }, 0);
      }
    } catch (e) {
      console.log(e);
    }
  }, [visible]);

  return wallet.connected ? (
    <Menu
      as="div"
      className="relative flex justify-center items-center w-full text-left font-extrabold "
    >
      <Menu.Button
        className={` bg-[#333333] py-1  transition hover:delay-75 duration-200 hover:bg-[#616161]  items-center border-[1px] border-white   px-6 w-full rounded-[2px] inline-flex justify-between gap-x-1.5  text-sm text-white uppercase font-extrabold  ${inria_serif_bold.className} uppercase lg:text-[13px]`}
        style={{
          borderRadius: "9999px",
        }}
      >
        <span
          className={`${inria_serif_bold.className} text-[11px] xs:text-[13px] sm:text-[15px] lg:text-[13px]`}
        >
          {isExtraSmallScreen
            ? wallet?.publicKey?.toBase58().slice(0, 3) +
              "..." +
              wallet.publicKey?.toBase58().slice(-2)
            : wallet?.publicKey?.toBase58().slice(0, 6) +
              "..." +
              wallet.publicKey?.toBase58().slice(-4)}
        </span>
        {/* <ChevronDownIcon aria-hidden="true" /> */}

        <NextImage
          src={arrowDown}
          alt="arrow down"
          width={8}
          height={8}
          className="ml-2"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`border-[1px] px-4 rounded-xl border-white absolute top-[1.5rem]  z-10 mt-2 w-full origin-bottom  bg-[#333333] focus:outline-none ${inria_serif_bold.className} uppercase lg:text-[13px]`}
        >
          <div className="py-1">
            {showProfile && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    // <div
                    //   className={classNames(
                    //     active ? "bg-yellow-900 text-gray-900" : "text-white"
                    //   )}
                    // >
                    <span
                      onClick={() => router.push("/profile")}
                      className={classNames(
                        active ? "text-[#A0A0A0]" : "text-white",
                        ` ${inria_serif_bold.className} block px-2 py-2 text-xs cursor-pointer uppercase font-extrabold  transition hover:delay-75 duration-200 `
                      )}
                    >
                      MY PROFILE
                    </span>
                    // </div>
                  )}
                </Menu.Item>
                <span className="w-full bg-[#FFFFFF] bg-opacity-20 h-[1px] block" />
              </>
            )}

            {showLeaderBoard && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    // <div
                    //   className={classNames(
                    //     active ? "bg-yellow-900 text-gray-900" : "text-white"
                    //   )}
                    // >
                    <span
                      onClick={() => router.push("/leaderboard")}
                      className={classNames(
                        active ? "text-[#A0A0A0]" : "text-white",
                        ` ${inria_serif_bold.className} block px-2 py-2 text-xs cursor-pointer uppercase font-extrabold transition hover:delay-75 duration-200 `
                      )}
                    >
                      VIEW LEADERBOARD
                    </span>
                    // </div>
                  )}
                </Menu.Item>
                <span className="w-full bg-[#FFFFFF] bg-opacity-20 h-[1px] block" />
              </>
            )}
            <Menu.Item>
              {({ active }) => (
                // <div
                //   className={classNames(
                //     active ? "bg-yellow-900 text-gray-900" : "text-white"
                //   )}
                // >
                <span
                  onClick={async () => {
                    await wallet.disconnect();
                    // logout();
                  }}
                  className={classNames(
                    active ? "text-[#A0A0A0]" : "text-white",
                    ` ${inria_serif_bold.className} block px-2 py-2 text-xs cursor-pointer uppercase font-extrabold  transition hover:delay-75 duration-200`
                  )}
                >
                  DISCONNECT
                </span>
                // </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <>
      {onVendingMachine ? (
        <button
          style={{
            borderRadius: "9999px",
          }}
          className={`bg-[#F7D05A] mt-4 py-1 border-2 max-w-52 light-border hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[10px] text-black text-center font-extrabold uppercase ${inria_serif_regular.className}`}
          onClick={() => setVisible(true)}
        >
          Connect Now
        </button>
      ) : (
        <button
          style={{
            borderRadius: "9999px",
          }}
          className="bg-[#F7D05A] py-1 border-2 light-border hover:bg-[#f9e4a2] transition-all hover:delay-75 duration-200    w-full rounded-[2px] inline-flex justify-center gap-x-1 text-[8px]  xs:text-[10px] sm:text-[10px] md:text-[12px] text-black text-center font-extrabold uppercase"
          onClick={() => setVisible(true)}
        >
          Connect
        </button>
      )}
    </>
  );
}
