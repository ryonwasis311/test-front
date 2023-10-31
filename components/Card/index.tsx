import Image from "next/image";
import UserUpdate from "../ModalSetting/UserUpdate";
import { useState } from "react";

export const Card = () => {

  const [isSetting , setIsSetting] = useState<boolean>(false);
  const closeModalSetting = () => {
    setIsSetting(false);
  }
  const openModalSetting = () =>{
    setIsSetting(true);
  }

  return (
    <>
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {/* user information */}
        <li className="pb-3 sm:pb-4 px-10">
          <div className="flex items-center space-x-4">
            <div
            onClick={openModalSetting}
            className="flex-shrink-0 cursor-pointer
            ">
              <Image
                width={500}
                height={500}
                className="w-8 h-8 rounded-full"
                src="/static/images/user/post_member.png"
                alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0 cursor-pointer">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm font-[400] text-[#6C6C6C] truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ABOUT ME
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <button
                className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[77px] lg:w-[70px] sm:w-[70px] w-[50px] 2xl:h-[40px] lg:h-[40px] sm:h-[40px] h-[30px]  items-center flex lg:justify-center sm:justify-around button-effect px-2
                bg-[#272727] opacity-100
                 `}
              >
                <p
                  className={`lg:text-[10px] 2xl:text-[10px] sm:text-[6px] text-[8px] lg:tracking-[0.5px] sm:tracking-[3px]   font-semibold font-Inter  text-whitetext-opacity-100  `}
                >
                  DELETE
                </p>
              </button>
            </div>
          </div>
          <UserUpdate
            show={isSetting}
            onCloseModalSetting={closeModalSetting}
          />
        </li>
        <li className="py-3 sm:py-4 px-10">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 cursor-pointer">
              <Image
                width={500}
                height={500}
                className="w-8 h-8 rounded-full"
                src="/static/images/user/post_member.png"
                alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0 cursor-pointer">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm font-[400] text-[#6C6C6C] truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ABOUT ME
            </div>
          </div>
        </li>

      </ul>
    </>
  )
}