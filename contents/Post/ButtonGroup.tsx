import Image from "next/image";
import { useState } from "react";
import ModalCreate from "../../components/ModalSetting/ModalCreate";
import ModalSetting from "../../components/ModalSetting/ModalSetting";

import {setActiveButton} from "../../store/button"
import  { selectButton } from "../../store/button";
import { useDispatch, useSelector } from "react-redux";

import ModalVideoCreate from "../../components/ModalSetting/ModalVideoCreate";

export const ButtonGroup = ({ connected, publicKey, setPageNum }) => {

  const dispatch =useDispatch();
  const [activeBtn, setActiveBtn] = useState<string>("Posts");
  const [create, setCreate] = useState<string>("Create Post");
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isClip, setIsClip] = useState<boolean>(false);
  const [isdisabled, SetIsdisabled] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  
  const closeModalSetting = () => {
    setIsSetting(false);
  }
  const closeModalPost = () => {
    setInputText("");
    setImageName("");
    console.log("inputText");
    console.log(inputText);
    setIsPost(false);
  }
  const closeModalClip = () => {
    setInputText("");
    setImageName("");
    console.log("inputText");
    console.log(inputText);
    setIsClip(false);
  }
  const openModalPost = () => setIsPost(true);
  const openModalClips = () => { setIsClip(true) };
  const handleclick = (e, label, title) => {
    dispatch(setActiveButton(label));
    setActiveBtn(label);
    if (title === "Create Post" || title === "Create Clips") setCreate(title);
  };
  const handleMouseOver = (label) => {
    setActiveBtn(label);
  };
  const handleModalSetting = () => {
    setIsSetting(true);
  };
  return (
    <>
      <div className="w-full h-full relative lg:mt-0 mt-10">
        <div className="lg:absolute 2xl:right-[70px] xl:right-[50px] lg:right-[30px] right-0 my-auto top-0 bottom-0 h-fit">
          {/* Group1 */}
          <div className="lg:flex-col lg:gap-0 flex justify-center sm:gap-16 gap-10 lg:mb-8 sm:mb-10 mb-5">
            <button
              className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] 2xl:w-[97px] lg:w-[90px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-between sm:justify-around button-effect px-2 ${activeBtn.toLowerCase() === "posts"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }
               
                `}
              onClick={(e) => handleclick(e, "Posts", "Create Post")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                className={`2xl:w-[18px] lg:w-[17px] sm:w-[19px] w-[20px] 2xl:h-[18px] lg:h-[17px] sm:h-[19px] h-[20px] max-sm:mx-auto ${isdisabled ? `opacity-40` : `opacity-100`
                  }`}
              >
                <path
                  d="M17.2674 27H9.73256C2.91349 27 0 24.0865 0 17.2674V9.73256C0 2.91349 2.91349 0 9.73256 0H17.2674C24.0865 0 27 2.91349 27 9.73256V17.2674C27 24.0865 24.0865 27 17.2674 27ZM9.73256 1.88372C3.94326 1.88372 1.88372 3.94326 1.88372 9.73256V17.2674C1.88372 23.0567 3.94326 25.1163 9.73256 25.1163H17.2674C23.0567 25.1163 25.1163 23.0567 25.1163 17.2674V9.73256C25.1163 3.94326 23.0567 1.88372 17.2674 1.88372H9.73256Z"
                  fill="white"
                />
                <path
                  d="M13.5 27C12.9851 27 12.5581 26.573 12.5581 26.0581V0.94186C12.5581 0.426977 12.9851 0 13.5 0C14.0148 0 14.4418 0.426977 14.4418 0.94186V26.0581C14.4418 26.573 14.0148 27 13.5 27Z"
                  fill="white"
                />
                <path
                  d="M13.5 11.3023H0.94186C0.426977 11.3023 0 10.8753 0 10.3604C0 9.84556 0.426977 9.41858 0.94186 9.41858H13.5C14.0149 9.41858 14.4419 9.84556 14.4419 10.3604C14.4419 10.8753 14.0149 11.3023 13.5 11.3023Z"
                  fill="white"
                />
                <path
                  d="M26.0581 17.5814H13.5C12.9851 17.5814 12.5581 17.1544 12.5581 16.6395C12.5581 16.1246 12.9851 15.6977 13.5 15.6977H26.0581C26.573 15.6977 27 16.1246 27 16.6395C27 17.1544 26.573 17.5814 26.0581 17.5814Z"
                  fill="white"
                />
              </svg>
              <p
                className={`lg:text-[16px] 2xl:text-[18px] sm:text-[17px] max-sm:hidden lg:tracking-[0.5px] sm:tracking-[3px]   font-semibold font-Inter  text-white ${isdisabled ? `text-opacity-40` : `text-opacity-100`
                  }`}
              >
                Posts
              </p>
            </button>
            <button
              className={`cursor-default button-effect lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] backdrop-blur-[30px]  2xl:w-[95px] lg:w-[90px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-between sm:justify-around px-2 ${activeBtn === "Clips"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }`}
            onClick={(e) => handleclick(e, "Clips", "Create Clips")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="25"
                viewBox="0 0 32 25"
                fill="none"
                className={`2xl:w-[22px] lg:w-[20px] sm:w-[24px] w-[20px] 2xl:h-[22px] lg:h-[20px] sm:h-[24px] h-[20px] max-sm:mx-auto ${isdisabled ? `opacity-40` : `opacity-100`
                  }`}
              >
                <path
                  d="M15.2928 23.8576H6.71439C2.4252 23.8576 1 21.0072 1 18.1432V6.71439C1 2.4252 2.4252 1 6.71439 1H15.2928C19.5819 1 21.0071 2.4252 21.0071 6.71439V18.1432C21.0071 22.4324 19.5684 23.8576 15.2928 23.8576Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.6337 19.7644L23.8604 17.1176V8.5528L27.6337 5.90599C29.4797 4.61652 30.9999 5.40378 30.9999 7.67053V18.0135C30.9999 20.2802 29.4797 21.0675 27.6337 19.7644Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.8946 11.0713C15.0191 11.0713 15.9307 10.1598 15.9307 9.03533C15.9307 7.91088 15.0191 6.99933 13.8946 6.99933C12.7702 6.99933 11.8586 7.91088 11.8586 9.03533C11.8586 10.1598 12.7702 11.0713 13.8946 11.0713Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`2xl:w-[18px] lg:w-[17px] sm:w-[19px] w-[20px] 2xl:h-[18px] lg:h-[17px] sm:h-[19px] h-[20px] max-sm:mx-auto ${isdisabled ? `opacity-40` : `opacity-100`
                    }`}
                />
              </svg>
              <p className="2xl:text-[17px] lg:text-[16px] sm:text-[17px] max-sm:hidden lg:tracking-[1.2px] sm:tracking-[3px]   font-semibold font-Inter  text-white ">
                Clips
              </p>
            </button>
            <button
              className={`cursor-default lg:rounded-[13px] rounded-[15px] border-[2.5px] border-solid border-[#7A7A7A] 2xl:w-[145px] lg:w-[135px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex justify-between px-2
              ${activeBtn === "Messages"
                  ? `bg-[#3F3F3F] opacity-100`
                  : `bg-[#272727] opacity-50`
                }`}
            // onClick={(e) => handleclick(e, "Messages", "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 29 30"
                fill="none"
                className="2xl:w-[21px] sm:w-[20px] w-[21px] 2xl:h-[19px] lg:h-[18px] sm:h-[19px] h-[20px] max-sm:mx-auto"
              >
                <path
                  d="M9.775 23.95H9.1C3.7 23.95 1 22.6 1 15.85V9.1C1 3.7 3.7 1 9.1 1H19.9C25.3 1 28 3.7 28 9.1V15.85C28 21.25 25.3 23.95 19.9 23.95H19.225C18.8065 23.95 18.4015 24.1525 18.145 24.49L16.12 27.19C15.229 28.378 13.771 28.378 12.88 27.19L10.855 24.49C10.639 24.193 10.1395 23.95 9.775 23.95Z"
                  stroke="white"
                  strokeOpacity="1"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.75 9.10001H21.25"
                  stroke="white"
                  strokeOpacity="1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.75 15.85H15.85"
                  stroke="white"
                  strokeOpacity="1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="2xl:text-[17px] lg:text-[16px] sm:text-[17px] max-sm:hidden lg:tracking-[1.2px] sm:tracking-[2px]   font-semibold font-Inter  text-white ">
                Messages
              </p>
            </button>
          </div>
          {/* Group2 */}
          <div className="lg:flex-col lg:gap-0 flex justify-center sm:gap-16 gap-10 lg:mb-8 sm:mb-10 mb-5">
            <button
              className={`cursor-default lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#FFF] bg-[#272727] 2xl:w-[95px] lg:w-[90px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-between sm:justify-around px-2 ${activeBtn === "DAOs"
                ? `bg-[#3F3F3F] opacity-100`
                : `bg-[#272727] opacity-50`
                }`}
            // onClick={(e) => handleclick(e, "DAOs", "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                className="2xl:w-[17px] lg:w-[17px] sm:w-[19px] w-[20px] 2xl:h-[17px] lg:h-[17px] sm:h-[19px] h-[20px] max-sm:mx-auto"
              >
                <path
                  d="M22.6348 7.97823C22.5536 7.9647 22.4589 7.9647 22.3778 7.97823C20.5115 7.91061 19.0239 6.38243 19.0239 4.48911C19.0239 2.55522 20.5792 1 22.513 1C24.4469 1 26.0022 2.56875 26.0022 4.48911C25.9886 6.38243 24.501 7.91061 22.6348 7.97823Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.2415 17.8235C23.0942 18.1345 25.1363 17.81 26.5698 16.8498C28.4767 15.5786 28.4767 13.4959 26.5698 12.2247C25.1228 11.2645 23.0537 10.94 21.2009 11.2645"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.36557 7.97823C6.44671 7.9647 6.54138 7.9647 6.62252 7.97823C8.48879 7.91061 9.9764 6.38243 9.9764 4.48911C9.9764 2.55522 8.42117 1 6.48728 1C4.55339 1 2.99817 2.56875 2.99817 4.48911C3.01169 6.38243 4.4993 7.91061 6.36557 7.97823Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.75847 17.8235C5.90572 18.1345 3.86364 17.81 2.43013 16.8498C0.52329 15.5786 0.52329 13.4959 2.43013 12.2247C3.87717 11.2645 5.94629 10.94 7.79904 11.2645"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5204 18.0804C14.4393 18.0669 14.3446 18.0669 14.2635 18.0804C12.3972 18.0128 10.9095 16.4846 10.9095 14.5913C10.9095 12.6574 12.4648 11.1022 14.3987 11.1022C16.3326 11.1022 17.8878 12.671 17.8878 14.5913C17.8743 16.4846 16.3867 18.0263 14.5204 18.0804Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5849 22.3404C8.67808 23.6116 8.67808 25.6942 10.5849 26.9655C12.7487 28.4125 16.292 28.4125 18.4557 26.9655C20.3626 25.6942 20.3626 23.6116 18.4557 22.3404C16.3055 20.9069 12.7487 20.9069 10.5849 22.3404Z"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`2xl:text-[17px] lg:text-[16px] sm:text-[17px] max-sm:hidden lg:tracking-[1.2px] sm:tracking-[3px]   font-semibold font-Inter  text-white`}
              >
                DAOs
              </p>
            </button>
            <div className="relative">
              <button
                className={`cursor-default lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#7A7A7A] bg-[#272727] 2xl:w-[155px] lg:w-[147px] sm:w-[130px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex lg:justify-end sm:justify-center px-2 
              ${activeBtn === "Orbit"
                    ? `bg-[#3F3F3F] opacity-100`
                    : `bg-[#272727] opacity-50`
                  }`}
              // onClick={(e) => handleclick(e, "Orbit", "")}
              >
                <p className="2xl:text-[18px] sm:text-[17px] max-sm:hidden 2xl:mr-2 tracking-[1.2px] text-[14px]  font-semibold font-Inter  text-white  right-3">
                  Orbit <span className="text-[#a495ffb3]">Plus</span>
                </p>
              </button>
              <Image
                alt="earth"
                src="/static/images/icons/earth.png"
                className="z-10 absolute  2xl:top-[10px] xl:top-[6.5px] lg:top-[6px] top-0 bottom-0 2xl:left-[6px] xl:left-[7px] lg:left-[6px] left-0 right-0 ursor-pointer 2xl:w-[26px] lg:w-[28px] sm:w-[22px] w-[20px] 2xl:h-[26px] lg:h-[28px] sm:h-[22px] h-[20px] lg:flex sm:hidden max-sm:m-auto  "
                width={45}
                height={45}
              />
            </div>
            <button
              className={`cursor-default lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#7A7A7A] bg-[#272727] 2xl:w-[139px] lg:w-[134px] sm:w-[120px] w-[50px] 2xl:h-[45px] lg:h-[40px] sm:h-[45px] h-[30px] xl:mb-6 lg:mb-3 items-center flex justify-between px-2
              ${activeBtn === "Profile"
                  ? `bg-[#3F3F3F] opacity-100`
                  : `bg-[#272727] opacity-50`
                }`}
            // onClick={(e) => handleModalSetting()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                className="2xl:w-[22px] sm:w-[20px] w-[21px] 2xl:h-[20px] lg:h-[18px] sm:h-[19px] h-[20px] lg:flex   sm:hidden flex max-sm:mx-auto"
              >
                <path
                  d="M13.4997 14.8515C17.6008 14.8515 20.9254 11.5268 20.9254 7.42573C20.9254 3.32462 17.6008 0 13.4997 0C9.39859 0 6.07397 3.32462 6.07397 7.42573C6.07397 11.5268 9.39859 14.8515 13.4997 14.8515Z"
                  fill="white"
                  fillOpacity="0.3"
                />
                <path
                  d="M13.5 18.5643C6.05939 18.5643 0 23.5544 0 29.7029C0 30.1187 0.326732 30.4455 0.742573 30.4455H26.2574C26.6733 30.4455 27 30.1187 27 29.7029C27 23.5544 20.9406 18.5643 13.5 18.5643Z"
                  fill="white"
                  fillOpacity="0.3"
                />
              </svg>
              <p className="2xl:text-[17px] lg:text-[16px] sm:text-[17px] max-sm:hidden lg:tracking-[1.2px] sm:tracking-[1px]   font-semibold font-Inter  text-white ">
                My Profile
              </p>
            </button>
          </div>
          {/* Group3 */}
          <div className="lg:flex-col flex justify-center">
            <button
              className={`lg:rounded-[13px] rounded-[15px] border-[2px] border-solid border-[#7A7A7A] bg-[#d5a3ff24] 2xl:w-[144px] lg:w-[140px] sm:w-[300px] w-[230px] 2xl:h-[49px] lg:h-[44px] sm:h-[50px] h-[40px] lg:mb-4 items-center flex justify-between px-2 button-effect
              ${!create ? `hidden` : `flex`}`}
              onClick={
                create === "Create Post" ? openModalPost : openModalClips
              }
            >
              <p className="2xl:text-[18px] sm:text-[17px] tracking-[1.2px] text-[14px]    font-semibold font-Inter text-white  mx-auto ">
                {create}
              </p>
            </button>
            <ModalVideoCreate
              placeholdertext={inputText}
              imagename={imageName}
              createshow={isClip}
              onCloseModalSetting={closeModalClip}
              setPageNum={setPageNum}
            />
            <ModalCreate
              placeholdertext={inputText}
              imagename={imageName}
              createshow={isPost}
              onCloseModalSetting={closeModalPost}
              setPageNum={setPageNum}
            />
            <ModalSetting
              show={isSetting}
              onCloseModalSetting={closeModalSetting}
              connected={connected}
              publicKey={publicKey}
            />
          </div>
        </div>
      </div>
    </>
  );
};
