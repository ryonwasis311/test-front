"use client";

import { useState, useRef, useEffect, ReactElement } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { truncate } from "../../utils";
import { useMediaQuery } from "react-responsive";

const MobileMenu = ({ conntected, publicKey }): ReactElement => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const trigger = useRef<HTMLElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });

  function getAccount() {
    (window as any).solana.connect();
    (window as any).solana.request({ method: "connect" });
  }
  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  //close the mobile menu if the esc key is pressed.
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.addEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex xl:hidden ">
      <button
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <div>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-[#000000]"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="">
            <li className="flex justify-center w-full">
              <div className=" relative ">
                <input
                  name="text"
                  type="text"
                  className="mt-[50px] rounded-[30px]  w-[200px] sm:w-[340px] 2xl:h-[50px] h-[40px] bg-[#e5e5e524] boder-[2px] border-solid border-[#7A7A7A] text-white  placeholder:text-placehd1 outline-none  py-3 pl-16"
                  placeholder="Search Orbit..."
                />
                <Image
                  alt="earth"
                  src="/static/images/icons/search.png"
                  className="absolute top-[58px] left-[18px] cursor-pointer 2xl:w-[30px] w-[25px] 2xl:h-[30px] h-[25px]"
                  width={30}
                  height={30}
                />
              </div>
            </li>
            <li className="flex justify-center">
              <ButtonPrimary
                sizeClass={`mt-[50px] ${
                  isDesktop && "w-[190px]"
                }  w-[200px] sm:w-[340px] 2xl:h-[50px] h-[40px]`}
                fontSize={`font-[600] ${
                  isDesktop && "text-[16px]"
                }] text-[10px]`}
                className={`rounded-[20px] mt-[10px]}`}
                onClick={getAccount}
              >
                <WalletMultiButton
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0px",
                    margin: "0px",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <span
                    className={`font-[600] ${
                      isDesktop && "text-[16px]"
                    } 2xl:text-[14px] lg:text-[13px] sm:text-[12px] text-[10px]`}
                  >
                    {conntected
                      ? truncate(publicKey.toString(), 10)
                      : "CONNECT WALLET"}
                  </span>
                </WalletMultiButton>
              </ButtonPrimary>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default MobileMenu;
