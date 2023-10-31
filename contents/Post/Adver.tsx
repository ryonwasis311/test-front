import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

export const Adver = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });

  return (
    <div className="w-full lg:h-full flex justify-center items-center">
      <div className="lg:w-auto w-full">
        {/* Featured */}
        <div
          className={`${
            isDesktop
              ? "w-[400px] relative"
              : "2xl:w-[360px] xl:w-[330px] lg:w-[270px] w-full"
          } xl:max-h-[521px] lg:max-h-[300px] rounded-[17px] p-4 relative`}
        >
          <div
            className="absolute w-full border-solid border-[1px] h-full left-0 top-0 rounded-[17px] opacity-60  z-0 p-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, #921DEE 56.25%, #2B2B2B 100%)",
            }}
          >
            <div className="w-full h-full rounded-[17px] bg-[#2B2B2B] z-0"></div>
          </div>
          {/* header */}
          <div className="relative z-10 w-ful h-full">
            <div className="flex justify-between ">
              <div className="flex items-center z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="17"
                  viewBox="0 0 26 20"
                  fill="none"
                >
                  <path
                    d="M17.5636 1.42694L19.315 4.92984C19.551 5.41428 20.1845 5.87388 20.7187 5.97326L23.8862 6.49497C25.9109 6.83035 26.3829 8.29616 24.9296 9.76192L22.4577 12.2338C22.0478 12.6437 21.8118 13.4511 21.9484 14.035L22.6564 17.0907C23.2154 19.5005 21.9236 20.4445 19.7995 19.1775L16.8307 17.4136C16.2966 17.0907 15.4022 17.0907 14.8681 17.4136L11.8993 19.1775C9.77515 20.4321 8.4833 19.5005 9.04227 17.0907L9.7503 14.035C9.8621 13.4387 9.62609 12.6313 9.21617 12.2214L6.74427 9.74949C5.29094 8.29616 5.76296 6.83035 7.78769 6.48254L10.9553 5.96083C11.4894 5.87388 12.1229 5.40186 12.3589 4.91742L14.1104 1.41452C15.0668 -0.473571 16.6071 -0.473571 17.5636 1.42694Z"
                    fill="url(#paint0_linear_100_67)"
                  />
                  <path
                    d="M8.3846 2.09615H0.931622C0.422335 2.09615 0 1.67382 0 1.16453C0 0.655246 0.422335 0.23291 0.931622 0.23291H8.3846C8.89389 0.23291 9.31622 0.655246 9.31622 1.16453C9.31622 1.67382 8.89389 2.09615 8.3846 2.09615Z"
                    fill="url(#paint1_linear_100_67)"
                  />
                  <path
                    d="M4.65811 19.4864H0.931622C0.422335 19.4864 0 19.0641 0 18.5548C0 18.0455 0.422335 17.6232 0.931622 17.6232H4.65811C5.1674 17.6232 5.58973 18.0455 5.58973 18.5548C5.58973 19.0641 5.1674 19.4864 4.65811 19.4864Z"
                    fill="url(#paint2_linear_100_67)"
                  />
                  <path
                    d="M2.17379 10.7913H0.931622C0.422335 10.7913 0 10.3689 0 9.85966C0 9.35038 0.422335 8.92804 0.931622 8.92804H2.17379C2.68307 8.92804 3.10541 9.35038 3.10541 9.85966C3.10541 10.3689 2.68307 10.7913 2.17379 10.7913Z"
                    fill="url(#paint3_linear_100_67)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_100_67"
                      x1="15.8369"
                      y1="0"
                      x2="15.8369"
                      y2="19.741"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#C89CFF" />
                      <stop offset="1" stopColor="#834EAC" stopOpacity="0.77" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_100_67"
                      x1="4.65811"
                      y1="0.23291"
                      x2="4.65811"
                      y2="2.09615"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#C89CFF" />
                      <stop offset="1" stopColor="#834EAC" stopOpacity="0.77" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_100_67"
                      x1="2.79487"
                      y1="17.6232"
                      x2="2.79487"
                      y2="19.4864"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#C89CFF" />
                      <stop offset="1" stopColor="#834EAC" stopOpacity="0.77" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_100_67"
                      x1="1.5527"
                      y1="8.92804"
                      x2="1.5527"
                      y2="10.7913"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#C89CFF" />
                      <stop offset="1" stopColor="#834EAC" stopOpacity="0.77" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="font-Inter text-[white] font-semibold lg:text-[16px] ml-2">
                  Featured
                </p>
              </div>
              <div className="z-10 max-w-[40px] max-h-[23px] rounded-[8px] border-[2px] border-solid border-[#7A7A7A] px-1 flex justify-center">
                <p className="z-10 text-[#89898970] font-Inter lg:text-[12px] text-[12px] self-center font-medium">
                  AD
                </p>
              </div>
            </div>
            {/* content */}
            <div className="lg:max-w-[434px] max-h-[435px] rounded-[28px] bg-[#eaeaea1a] mt-4 p-2">
              <div className="flex items-center">
                <Image
                  src="/static/images/user/post_member.png"
                  width={40}
                  height={40}
                  alt=""
                  className="z-10"
                />
                <p className="text-white lg:text-[18px] font-semibold font-Inter tracking-[0.95px] ml-2">
                  Jammy
                </p>
              </div>
              <p className="text-[#A1A1A1] lg:text-[10px] font-Inter tracking-[0.95px] ml-[45px] -mt-[12px] font-bold">
                @suitsyndicate
              </p>
              <Image
                src="/static/images/icons/advertisement.png"
                width={300}
                height={200}
                alt="image"
                className="rounded-[10px] px-2 py-3 xl:w-[300px] lg:w-[250px] xl:h-[200px] lg:h-[150px]"
              />
            </div>
          </div>
        </div>
        {/* Creators of the month */}
        <div
          className={`${
            isDesktop
              ? "w-[400px] relative"
              : "2xl:w-[365px] xl:w-[330px] lg:w-[270px] w-full"
          } rounded-[17px] xl:mt-[30px] lg:mt-[20px] mt-[20px] relative`}
        >
          <div
            className="absolute w-full border-solid border-[1px] h-full left-0 top-0 rounded-[17px] opacity-60  z-0 p-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, #921DEE 56.25%, #2B2B2B 100%)",
            }}
          >
            <div className="w-full h-full rounded-[17px] bg-[#2B2B2B] z-0"></div>
          </div>
          {/* title */}
          <div className="relative z-10 flex justify-center px-5 py-[6px]">
            <p className="text-white lg:text-[18px] text-[16px] tracking-[1.25px] font-medium font-Inter mx-auto ">
              {" "}
              Creators of the month!{" "}
            </p>
          </div>
          <div className="border-b-[3px] border-b-[#5C5C5C] mx-[2px]"></div>
          {/* post_user1 */}
          <div className="relative z-10 flex px-4 py-2">
            <Image
              src="/static/images/icons/1.png"
              width={30}
              height={18}
              alt="avatar"
              className="self-center"
            />
            <div className="flex ml-3 items-center">
              <Image
                src="/static/images/icons/user1.png"
                width={30}
                height={18}
                alt="avatar"
                className=""
              />
              <div className="max-h-[42px] rounded-[30px] bg-[#ffdb593d] flex z-10 items-center -ml-7 my-auto py-[6px]">
                <p className="text-white font-Inter sm:text-[14px]  ml-[34px] mr-[3px] font-medium tracking-[1px]">
                  Bad
                </p>
                <p className="text-[#BABABA] font-Inter sm:text-[14px] tracking-[1px] font-medium mr-4">
                  @sthbab
                </p>
              </div>
            </div>
          </div>
          <div className="border-b-[3px] border-b-[#5C5C5C] mx-[2px]"></div>
          {/* post_user2 */}
          <div className="relative z-10 flex px-4 py-2">
            <Image
              src="/static/images/icons/2.png"
              width={30}
              height={18}
              alt="avatar"
              className=" self-center"
            />
            <div className="flex ml-3 items-center">
              <Image
                src="/static/images/icons/user2.png"
                width={30}
                height={18}
                alt="avatar"
                className=""
              />
              <div className="max-h-[42px] rounded-[30px] bg-[#f6f4e93d] flex z-10 items-center -ml-7 my-auto py-[6px]">
                <p className="text-white font-Inter sm:text-[14px]   font-medium  ml-[34px] ">
                  Sim
                </p>
                <p className="text-[#BABABA] font-Inter sm:text-[14px]   font-medium ml-[4px] mr-[14px] tracking-[1px]">
                  @onlysim
                </p>
              </div>
            </div>
          </div>
          <div className="border-b-[3px] border-b-[#5C5C5C] mx-[2px]"></div>
          {/* post_user3 */}
          <div className="relative z-10 flex px-4 py-2 ">
            <Image
              src="/static/images/icons/3.png"
              width={30}
              height={18}
              alt="avatar"
              className=" self-center"
            />
            <div className="flex ml-3 items-center">
              <Image
                src="/static/images/icons/user3.png"
                width={30}
                height={18}
                alt="avatar"
                className=""
              />
              <div className="max-h-[42px] rounded-[30px] bg-[#ffb6903d] flex z-10 items-center -ml-7 my-auto py-[6px]">
                <p className="text-white font-Inter sm:text-[14px]   font-medium  ml-[34px] tracking-[1px]">
                  Bad
                </p>
                <p className="text-[#BABABA] font-Inter sm:text-[16px]  font-medium ml-[4px]  mr-[14px] tracking-[1px]">
                  @sbinging
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
