import { useRouter } from "next/router";
import Image from "next/image";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ModalSetting from "../ModalSetting/ModalSetting";
import { useEffect, useState } from "react";
import { imgSrc, truncate } from "../../utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import MobileMenu from "./mobilemenu";

const Header = ({ connected, publicKey }) => {
  const [isSetting, setIsSetting] = useState(false);
  const router = useRouter();
  const openModalSetting = () => setIsSetting(true);
  const closeModalSetting = () => setIsSetting(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log("user in header: ", user);
    console.log("user avatr in imgSrc: ", imgSrc(user.user.avatar));
  }, [user]);
  function connectAccount() {
    window.solana.connect();
    window.solana.request({ method: "connect" });
  }

  return (
    <>
      <div className="xl:h-[90px] lg:h-[75px] h-[70px] py-5 flex justify-between items-center 2xl:px-[112px] xl:px-[100px] lg:px-[100px] md:px-[60px] px-[30px] relative">
        {/* avatar&&setting */}
        <div className="relative flex">
          <Image
            alt="avatar"
            src={imgSrc(user.user.avatar)}
            unoptimized
            className="object-cover 2xl:w-[55px] sm:w-[50px] w-[35px] 2xl:h-[55px] sm:h-[50px] h-[35px] rounded-full"
            width={55}
            height={55}
          />
          <Image
            alt="setting"
            src="/static/images/icons/setting.png"
            className="absolute bottom-0 lg:left-[-25px] md:left-[-15px] left-[-10px] cursor-pointer 2xl:w-[18px] sm:w-[16px] w-[12px] 2xl:h-[18px] sm:h-[16px] h-[12px]"
            onClick={openModalSetting}
            width={20}
            height={20}
          />
          <ModalSetting
            show={isSetting}
            onCloseModalSetting={closeModalSetting}
            connected={connected}
            publicKey={publicKey}
          />
          <p className="items-center self-center ml-1 text-white text-[16px] font-Inter">
            @{user.user.name}
          </p>
        </div>
        <div className="hidden lg:flex ml-8 bg-[#e2bdff3d] max-w-[135px] h-[40px]  border-[2px] border-solid rounded-[30px]  border-[#7A7A7A] mx-auto justify-end items-center px-2">
          <Image
            alt="earth"
            src="/static/images/icons/earth.png"
            className="object-cover cursor-pointer xl:w-[20px] lg:w-[19px] sm:w-[16px]  xl:h-[20px] lg:h-[19px] sm:h-[16px] "
            width={45}
            height={45}
            onClick={() => {
              router.push("/");
            }}
          />
          <p className="font-bold font-Inter text-white lg:text-[9px] ml-[2px] xl:text-[10px] lg:text-[8x]">
            Points:
          </p>
          <p className="font-bold font-Inter text-[#d6cfffc4] lg:text-[9px] xl:text-[10px] ml-[3px]">
            10
          </p>
        </div>
        {/* earth_image */}
        <Image
          alt="earth"
          src="/static/images/icons/earth.png"
          className="cursor-pointer absolute sm:mt-[2px] mt-[3px] xl:w-[86px] sm:w-[65px] w-[35px] xl:h-[86px] sm:h-[65px] h-[35px] mx-auto left-0 right-0"
          width={86}
          height={86}
          onClick={() => {
            router.push("/");
          }}
        />
        {/* beta */}
        <div className="absolute  bg-[#e2bdff3d] xl:w-[34px] sm:w-[30px] w-[25px] xl:h-[16px] sm:h-[13px] h-[10px]  border-[1px] border-solid rounded-[30px]  border-[#7A7A7A] mx-auto sm:left-[90px] left-[50px] right-0 top-4 flex justify-center items-center">
          <p className="font-bold font-Inter text-white xl:text-[10px]  sm:text-[10px] text-[8px]  ">
            BETA
          </p>
        </div>
        {/* search_bar */}
        <div className="hidden xl:flex relative mr-10">
          <input
            name="text"
            type="text"
            className="rounded-[30px] lg:w-[180px]  w-[140px]  h-[40px] bg-[#e5e5e524] boder-[2px] border-solid border-[#7A7A7A] text-white  placeholder:text-placehd1 outline-none  pr-8 pl-12"
            placeholder="Search Orbit..."
          />
          <Image
            alt="earth"
            src="/static/images/icons/search.png"
            className="absolute left-[14px] my-auto top-0 bottom-0 cursor-pointer  sm:w-[23px]  sm:h-[23px]"
            width={30}
            height={30}
          />
        </div>
        {/* wallet_button */}
        <ButtonPrimary
          sizeClass="2xl:w-[180px] xl:w-[160px] md:w-[150px] w-[140px] 2xl:h-[45px] xl:h-[40px] lg:h-[38px] sm:h-[35px] h-[35px] "
          fontSize="font-[600] 2xl:text-[25px] xl:text-[22px] lg:text-[18px] text-[12px]"
          className={`rounded-full xl:mr-0 lg:mr-[90px] lg:flex hidden `}
          onClick={connectAccount}
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
            {connected ? (
              <span
                className={`font-[600] 2xl:text-[15px] lg:text-[13px] sm:text-[12px] text-[10px]`}
              >
                {truncate(publicKey.toString(), 10)}
              </span>
            ) : (
              <div className="w-full h-full flex justify-center items-center gap-[10px]">
                <Image
                  alt="avatar"
                  src="/static/images/icons/sol1.png"
                  className={`2xl:w-[30px] w-[20px] 2xl:h-[30px] h-[20px]`}
                  width={55}
                  height={55}
                />
                <span
                  className={`font-[600] 2xl:text-[15px] lg:text-[14px] sm:text-[13px] text-[11px]`}
                  style={{ fontFamily: "Inter" }}
                >
                  CONNECT
                </span>
              </div>
            )}
          </WalletMultiButton>
        </ButtonPrimary>
        {/* noticification */}
        <div className="absolute right-[70px] md:right-[160px] xl:right-12">
          <div className="relative ml-0 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="26"
              viewBox="0 0 30 36"
              fill="none"
              className="sm:w-[20px] w-[15px] sm:h-[26px] h-[22px]"
            >
              <path
                d="M29.3092 22.4836L27.359 19.4954C26.9495 18.8293 26.579 17.5692 26.579 16.8312V12.2769C26.579 8.04657 23.8878 4.39231 20.0071 2.68219C18.993 1.02607 17.1209 0 14.9757 0C12.8501 0 10.939 1.06208 9.92497 2.73619C6.12222 4.48232 3.48955 8.10057 3.48955 12.2769V16.8312C3.48955 17.5692 3.11903 18.8293 2.7095 19.4774L0.73987 22.4836C-0.0401809 23.6897 -0.215692 25.0218 0.27184 26.2459C0.739871 27.4519 1.85144 28.388 3.29454 28.838C7.07779 30.0261 11.056 30.6022 15.0342 30.6022C19.0125 30.6022 22.9907 30.0261 26.774 28.856C28.1391 28.442 29.1922 27.4879 29.6992 26.2459C30.2062 25.0038 30.0697 23.6357 29.3092 22.4836Z"
                fill="#EBEBEB"
                fillOpacity="0.7"
              />
              <path
                d="M20.5137 32.4203C19.6946 34.5084 17.53 36.0025 14.9948 36.0025C13.4542 36.0025 11.9331 35.4265 10.8605 34.4004C10.2365 33.8604 9.76847 33.1403 9.49545 32.4023C9.74897 32.4383 10.0025 32.4563 10.2755 32.4923C10.724 32.5463 11.1921 32.6003 11.6601 32.6363C12.7717 32.7263 13.9028 32.7803 15.0338 32.7803C16.1454 32.7803 17.257 32.7263 18.3491 32.6363C18.7586 32.6003 19.1681 32.5823 19.5581 32.5283C19.8701 32.4923 20.1822 32.4563 20.5137 32.4203Z"
                fill="#EBEBEB"
                fillOpacity="0.7"
              />
            </svg>
            <div className="rounded-[30px] border-solid border-[#7a7a7a4d] sm:px-2 px-1">
              <p className="absolute text-red-700 sm:top-[-4px] -top-1 sm:left-[8px] left-[5px] px-2 text-[#FF6C6C] rounded-[30px] border-solid border-[#7a7a7a4d] sm:text-[10px] text-[7px] bg-[#2727274d]">
                0
              </p>
            </div>
          </div>
        </div>
        {/* mobile_menu */}
        <MobileMenu conntected={connected} publicKey={publicKey} />
        {/* border */}
      </div>
      <div className="border-b-2 border-b-[#5C5C5C]"></div>
    </>
  );
};
export default Header;
