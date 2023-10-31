import MainLayout from "../../layouts/MainLayout";
import { ButtonGroup } from "../../contents/Post/ButtonGroup";
import { PostView } from "../../contents/Post/PostView";
import { Adver } from "../../contents/Post/Adver";
import { Snippets } from "../../contents/Post/Snippets";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { setActiveButton } from "../../store/button"
import { selectButton } from "../../store/button";
import { useDispatch, useSelector } from "react-redux";

const PostPage = () => {
  const { connected, publicKey } = useWallet();
  const [pageNum, setPageNum] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<boolean>(true);
  const buttonState = useSelector(selectButton);
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });

  return (
    <>
      <div className="lg:flex-row lg:justify-center items-center flex flex-col relative w-full h-full lg:overflow-hidden">
        <div className="lg:px-16 lg:w-[30%] ">
          <ButtonGroup
            connected={connected}
            publicKey={publicKey}
            setPageNum={setPageNum}
          />
        </div>
        <div className="lg:w-[40%] md:w-[60%] sm:w-[70%] w-[95%] lg:h-full md:h-[600px] sm:h-[600px] h-[500px]">
          {buttonState === "Posts" ?
            (<PostView pageNum={pageNum} setPageNum={setPageNum} />) :
            (<Snippets file={""} />)
          }
        </div>
        <div
          className={`lg:px-3 lg:w-[30%] md:w-[60%] sm:w-[70%] w-[95%] ${isDesktop ? "pl-14" : "2xl:pl-1 xl:pl-8 lg:pl-4"
            } lg:h-fit`}
        >
          <Adver />
        </div>
        {/* what's trending? */}
        <div className="absolute 2xl:left-28 lg:left-[50px] left-[30px] border-[2px] bottom-0 rounded-[16px] bg-[#272727] border-[#bd68ff69] max-lg:hidden xl:px-20 px-4">
          <p className="text-white font-Inter font-medium">What’s trending?</p>
          <div className="absolute bottom-4 xl:left-[120px] left-[60px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M15 0C6.735 0 0 6.735 0 15C0 23.265 6.735 30 15 30C23.265 30 30 23.265 30 15C30 6.735 23.265 0 15 0ZM21.09 17.685C20.865 17.91 20.58 18.015 20.295 18.015C20.01 18.015 19.725 17.91 19.5 17.685L19.2426 17.4276C16.8995 15.0845 13.1005 15.0845 10.7574 17.4276L10.5 17.685C10.065 18.12 9.345 18.12 8.91 17.685C8.475 17.25 8.475 16.53 8.91 16.095L14.205 10.8C14.64 10.365 15.36 10.365 15.795 10.8L21.09 16.095C21.525 16.545 21.525 17.25 21.09 17.685Z"
                fill="#7B7B7B"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

PostPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default PostPage;
