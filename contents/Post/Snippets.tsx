import Image from "next/image";
import { useState, useEffect, use } from "react"
import { IUser } from "../../types";
import ReactPlayer from "react-player";
import React, { useRef } from "react"
import { useAppSelector } from "../../store/hooks";
import { TVideo } from "../../types";
import "slick-carousel/slick/slick.css"
import video, { selectVideo, updateVideo } from "../../store/video";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import { postService } from "../../services/post.service";
import { videoService } from "../../services/video.service";
import { useDispatch, useSelector } from "react-redux";
import { imgSrc } from "../../utils/common";
import { selectUser } from "../../store/user";
import { selectPosts, updateLikePosts, updatePosts } from "../../store/posts";
import { getFollowPosts } from "../../utils";

export interface UserVideoProps {
  file: string;
}

export const Snippets = (props: UserVideoProps) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 1024px)" });
  const { file } = props;
  const [allVideo, setAllVideo] = useState<TVideo[]>([]);
  const [isPlay, setPlay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sliderRef: any = useRef();
  const [name, setName] = useState("");
  const isDestop = useMediaQuery({ query: "(min-width: 1650)" });
  const dispatch = useDispatch();

  const curUser = useSelector(selectUser);
  const videoState = useSelector(selectVideo);

  useEffect(() => {
    const getAllVideos = async () => {
      const videoData: any = await postService.getAllVideo();
      if (videoData) {
        dispatch(updateVideo(videoData));
      }
    }
    getAllVideos();
    setAllVideo(videoState.video);
    console.log("all video:init", allVideo);
  }, [])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    touchMove: true,
    draggable: true,
    verticalSwiping: isTablet,
    arrows: false,

  };


  const handleLike = async (username: string, post_Id: string) => {
    const newfollow = {
      name: username,
      postId: post_Id
    }
    const data: any = await videoService.follow(newfollow);
    dispatch(updateVideo(data.videoAll));
    console.log("~~~~~~~~~~~~~~~~~~~" + data.videoAll)
    // dispatch(updateLikePosts(getFollowPosts(data.followAll)));
  }

  return (
    <div className="w-full h-full justify-center items-center 2xl:px-[50px] max-lg:py-[20px]">
      <div className="relative flex flex-col justify-center items-center m-auto h-full  ">

        {allVideo.length > 1 && (
          <Slider {...settings} ref={sliderRef}
            className="lg:w-[70%] lg:m-auto lg:justify-center w-full flex"
          >
            {allVideo.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`relative flex justify-center items-center my-5   xl:w-[80%] bg-[#212121] border-[2px] border-[#5C5C5C] rounded-[30px]`}
                >
                  <div className="absolute z-30 flex justify-around 2xl:right-[-5px] xl:right-[5px] lg:right-[4px] rounded-[15px] 2xl:w-[65px] xl:w-[50px] lg:w-[40px] w-full  2xl:h-[300px] xl:h-[280px] lg:h-[250px] sm:h-[50px] h-[40px] border-[2px] border-solid border-[#5C5C5C] bg-[#212121] lg:flex lg:flex-col lg:justify-center lg:items-center max-lg:mt-0 ">
                    {/* following */}
                    <div className="lg:flex-col flex justify-center lg:gap-1 gap-2 items-center lg:py-2 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="37" viewBox="0 0 39 37" fill="none" className="cursor-pointer 2xl:w-[35px] xl:w-[30px] lg:w-[25px] w-[25px] 2xl:h-[28px] xl:h-[23px] lg:h-[27px] h-[23px]">
                        <path d="M20.585 34.691C19.99 34.9125 19.01 34.9125 18.415 34.691C13.34 32.8635 2 25.24 2 12.3186C2 6.61476 6.3575 2 11.73 2C14.915 2 17.7325 3.62439 19.5 6.13482C21.2675 3.62439 24.1025 2 27.27 2C32.6425 2 37 6.61476 37 12.3186C37 25.24 25.66 32.8635 20.585 34.691Z" stroke="#B3B3B3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p
                        className="text-[#b54444bd] font-Inter font-medium flex justify-center 2xl:text-[15px] xl:text-[13px] lg:text-[12px] sm:text-[14px] text-[14px]"
                        onClick={() => handleLike(item.user.name, item._id)}
                      >{item.followers}</p>
                    </div>
                    {/* repost */}
                    <div className="lg:flex-col flex justify-center lg:gap-1 gap-2 items-center lg:py-2 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="37" viewBox="0 0 39 37" fill="none" className="cursor-pointer 2xl:w-[35px] xl:w-[30px] lg:w-[25px] w-[25px] 2xl:h-[28px] xl:h-[23px] lg:h-[27px] h-[23px]">
                        <path d="M29.9828 30.6539H12.7626C6.82165 30.6539 2 25.568 2 19.3015C2 13.0349 6.82165 7.94894 12.7626 7.94894H36.4403" stroke="#B3B3B3" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M31.4895 13.6248L37 7.81244L31.4895 2" stroke="#B3B3B3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-[#6ac56ebd] font-Inter font-medium flex justify-center 2xl:text-[15px] xl:text-[13px] lg:text-[12px] sm:text-[14px] text-[14px]" >{0}</p>
                    </div>
                    {/* comment */}
                    <div className="lg:flex-col flex justify-center lg:gap-1 gap-2 items-center lg:py-2 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="41" viewBox="0 0 39 41" fill="none" className="cursor-pointer 2xl:w-[35px] xl:w-[30px] lg:w-[25px] w-[25px] 2xl:h-[28px] xl:h-[23px] lg:h-[27px] h-[23px]">
                        <path d="M26.5 2H12.5C5.5 2 2 5.69181 2 13.0754V37.0722C2 38.0874 2.7875 38.9181 3.75 38.9181H26.5C33.5 38.9181 37 35.2263 37 27.8426V13.0754C37 5.69181 33.5 2 26.5 2Z" stroke="#B3B3B3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path opacity="0.4" d="M10.75 15.8443H28.25" stroke="#B3B3B3" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path opacity="0.4" d="M10.75 25.0738H23" stroke="#B3B3B3" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-[#4dc3ddbd] font-Inter font-medium flex justify-center 2xl:text-[15px] xl:text-[13px] lg:text-[12px] sm:text-[14px] text-[14px]" >{item.commentcnt}</p>
                    </div>


                  </div>
                  {/* videos */}
                  <div className="w-full relative  2xl:h-[550px] xl:h-[500px] lg:h-[400px] sm:h-[370px] h-[370px] flex justify-center items-center">
                    <div
                      className="2xl:mx-[10px] xl:mx-[7px] mx-[5px]  flex justify-center items-center overflow-hidden"
                    // style={{ height: "calc(100%)" }}
                    >
                      <div
                        className="rounded-[10px] z-100 object-cover overflow-hidden flex justify-center"

                      >
                        <div className="object-cover rounded-[10px] my-auto">
                          <div
                            key={index}
                            className="object-cover rounded-[10px] my-auto"
                            onMouseEnter={() => setShowVideo(true)}
                          >
                            <ReactPlayer
                              url={"http://192.168.3.42:4200/" + item.file}
                              // playing={index !== videoIndex ? false : isPlay}
                              playing={showVideo}
                              controls={showVideo}
                              loop={true}
                              width="100%"
                              height="100%"
                              style={{
                                objectFit: "cover",
                                borderRadius: "25px 25px 25px 25px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* following, repost, commment */}

                  {/* background */}
                  <div
                    style={{
                      background: ` linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.33) 19.27%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.42) 34.9%)`,
                    }}
                    className="absolute bottom-0  w-full rounded-br-[30px] rounded-bl-[30px]">
                    <div className="flex items-center pl-2">
                      <Image
                        src={imgSrc(item.user.avatar)}
                        width={50}
                        height={50}
                        alt="avatar"
                        className="rounded-full 2xl:w-[30px] xl:w-[25px] lg:w-[20px] w-[20px] 2xl:h-[30px] xl:h-[25px] lg:h-[20px] h-[20px]"
                      />
                      <p
                        className="text-white 2xl:text-[18px] xl:text-[16px] lg:text-[14px] sm:text-[12px] w-[12px] font-medium pl-1 tracking-[1px]">{item.user.name}</p>
                    </div>
                    <p className="text-white 2xl:text-[18px] xl:text-[16px] lg:text-[12px] sm:text-[12px] text-[10x] tracking-[0.5px]  pl-3" >{item.description}
                    </p>
                    <p className=" 2xl:text-[18px] xl:text-[16px] lg:text-[12px] sm:text-[12px] text-[10x] tracking-[0.6px]  pl-3 pb-3 text-[#75C5FF]">#streamhighlights</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}



      </div >
    </div>
  );
};

