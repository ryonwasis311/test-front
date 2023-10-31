import React, { useEffect } from "react";
import useState from "react-usestateref";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { postService } from "../../services/post.service";
import { selectUser } from "../../store/user";
import { TPost } from "../../types";
import OutlineFavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import { selectPosts, updateLikePosts, updatePosts } from "../../store/posts";
import { getFollowPosts, imgSrc, postSrc, truncate } from "../../utils";
import moment from "moment";
import RepostCreate from "../ModalSetting/RepostCreate";
// import ReportCreate from "../ModalSetting/ReportCreate";
import CommentCreate from "../ModalSetting/CommentCreate";
import { addPosts } from "../../store/posts";
import { toastNotification } from "../ToastNTF";
import InfiniteScroll from "react-infinite-scroll-component";
import { COMMENTS_COUNT_PER_PAGE } from "../../utils/constant";

export interface CardProps {
  post: TPost;
}
const SetMore = ({ children }) => {
  const text_length = children.length;
  if (text_length > 37) {
    ReadMore;
  } else return;
};
const ReadMore = ({ children }) => {
  const text = children;
  const text_length = children.length;
  const [isReadMore, setIsReadMore] = useState(true);
  const resultString = isReadMore ? truncate(text.toString(), 60) : text;
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (text_length > 60)
    return (
      <div className="flex justify-between items-center">
        <p className="has-text-lefts w-full">{resultString}</p>
        <span
          onClick={toggleReadMore}
          className="tag xl:w-[20%] lg:w-[17%] w-[20%] self-end xl:text-[15px] lg:text-[13px] sm:text-[11px] text-[10px] cursor-pointer"
        >
          {isReadMore ? "more" : "less"}
        </span>
      </div>
    );
  else {
    return <p className="has-text-lefts w-[85%]">{resultString}</p>;
  }
};

const VideoCard = (props: CardProps) => {
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState(1);
  const openModalPost = () => setIsPost(true);
  const [isPost, setIsPost] = useState<boolean>(false);
  const closeModalPost = () => setIsPost(false);
  const { post } = props;
  const [isComment, setIsComment] = useState(false);
  const openAddComment = () => setIsComment(true);
  const closeAddComment = () => setIsComment(false);
  const curUser = useSelector(selectUser);
  const allPost = useSelector(selectPosts);
  const [isLike, setIsLike] = useState(false);
  const [isCommentBool, SetIsCommentBool] = useState(false);
  const [repostImage, setRepostImage] = useState<string>("");
  const [repostDescription, setRepostDescription] = useState<string>("");
  const [text, setText] = React.useState(repostDescription);
  const [isErrText, setErrText] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pageNum1, setPageNum1] = useState(1);
  const [
    hasMoreAllPostComments,
    setHasMoreAllPostComments,
    hasMoreAllPostCommentsRef,
  ] = useState(true);
  const [subAllPostComments, setSubAllPostComments] = useState<any>([]);

  useEffect(() => {
    setPageNum(1);
    setHasMoreAllPostComments(true);
    if (
      post.comments !== null &&
      post.comments !== undefined &&
      post.commentcnt > 0
    ) {
      let initData = post.comments.slice(0, COMMENTS_COUNT_PER_PAGE);
      setSubAllPostComments(initData);
    }
    if (post.commentcnt < COMMENTS_COUNT_PER_PAGE) {
      setHasMoreAllPostComments(false);
    }
  }, [post.comments]);

  const dispatch = useDispatch();
  const newfollow = {
    name: curUser.user.name,
    postId: post._id,
  };
  const handleclick = async () => {
    const data: any = await postService.follow(newfollow);
    dispatch(updatePosts(data.postAll));
    dispatch(updateLikePosts(getFollowPosts(data.followAll)));
  };
  const openRepost = () => {
    setIsPost(true);
  };
  const handleShowComment = () => {
    if (post.commentcnt > 0) {
      SetIsCommentBool(!isCommentBool);
    }
  };

  const fetchAllPostComments = async () => {
    if (hasMoreAllPostCommentsRef.current) {
      if (post.comments === null || post.commentcnt === 0) {
        setHasMoreAllPostComments(false);
        return;
      }
      setTimeout(() => {
        const subArray: any = post.comments.slice(
          pageNum * COMMENTS_COUNT_PER_PAGE,
          (pageNum + 1) * COMMENTS_COUNT_PER_PAGE
        );
        let tempArray: any = [...subAllPostComments];
        tempArray = tempArray.concat(subArray);
        setSubAllPostComments(tempArray);
        setPageNum(pageNum + 1);

        if (subArray.length < COMMENTS_COUNT_PER_PAGE) {
          setHasMoreAllPostComments(false);
          return;
        }
      }, 1000);
    }
  };
  const onSubmit = async () => {
    setIsUpdating(true);
    const formdata = new FormData();
    formdata.append("name", curUser.user.name);
    formdata.append("description", post.description);
    if (post.file && post.file !== "" && post.file !== undefined) {
      formdata.append("repostfile", post.file);
    }
    const data: any = await postService.create(formdata);
    if (data.message === "success") {
      data.post.followers = 0;
      data.post.commentcnt = 0;
      dispatch(addPosts(data.post));
      console.log(data);
      setPageNum(1);
      toastNotification("Post creation success", "success", 5000);
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
      toastNotification("Post creation failed", "error", 5000);
    }
  };

  return (
    <div className="bg-[#404040] rounded-[20px] max-w-[662px] max-h-[900px] overflow-hidden m-auto 2xl:mb-4 lg:mb-2 mb-2 p-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src={imgSrc(post?.user?.avatar)}
            width={50}
            height={50}
            alt=""
            className="object-cover rounded-full 2xl:w-[40px] 2xl:h-[40px] xl:w-[35px] md:w-[30px] w-[20px] xl:h-[35px] md:h-[30px] h-[20px]"
            onError={(e: any) => {
              e.target.src = "/static/images/user/default.png";
            }}
          />
          <p className="text-white sm:text-[16px] text-[13px] font-semibold font-Inter tracking-[1px] ml-2">
            {post?.user?.nickname}
          </p>
          <p className="text-[#A1A1A1] sm:text-[16px] text-[13px] font-semibold font-Inter tracking-[1px] ml-2">
            @{post?.user?.name}
          </p>
        </div>
        <div className="flex gap-[5px]">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 20C4.48372 20 0 15.5163 0 10C0 4.48372 4.48372 0 10 0C15.5163 0 20 4.48372 20 10C20 15.5163 15.5163 20 10 20ZM10 1.39535C5.25581 1.39535 1.39535 5.25581 1.39535 10C1.39535 14.7442 5.25581 18.6047 10 18.6047C14.7442 18.6047 18.6047 14.7442 18.6047 10C18.6047 5.25581 14.7442 1.39535 10 1.39535Z"
                fill="#F4F4F4"
                fillOpacity="0.5"
              />
              <path
                d="M13.4508 13.6558C13.3298 13.6558 13.2089 13.6279 13.0973 13.5535L10.2136 11.8326C9.49729 11.4047 8.96706 10.4651 8.96706 9.63723V5.82328C8.96706 5.44189 9.28334 5.12561 9.66473 5.12561C10.0461 5.12561 10.3624 5.44189 10.3624 5.82328V9.63723C10.3624 9.97211 10.6415 10.4651 10.9298 10.6326L13.8136 12.3535C14.1485 12.5489 14.2508 12.9768 14.0554 13.3116C13.9159 13.5349 13.6833 13.6558 13.4508 13.6558Z"
                fill="#F4F4F4"
                fillOpacity="0.5"
              />
            </svg>
            <p className="text-[#f4f4f44d] sm:text-[15px] text-[13px] ml-1">
              {" "}
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="cursor-pointer" onClick={handleShowComment}>
          <div className="preserve-line-breaks text-white font-semibold mt-1 ml-4 break-all xl:text-[20px] lg:text-[18px] sm:text-[16px] text-[12px]">
            {post.description}
          </div>
          {post.file ? (
            <Image
              src={postSrc(post?.file)}
              width={630}
              height={100}
              alt="image"
              className="rounded-[10px] w-auto sm:h-[170px] h-[120px] px-4"
            />
          ) : null}
        </div>
        
      </div>
      <CommentCreate
        name={curUser.user.name}
        post_id={post._id}
        createshow={isComment}
        onCloseModalSetting={closeAddComment}
      />
      {/* comment */}
      {isCommentBool && (
        <div
          id="carousel-comment"
          className=" px-2 mt-10 max-h-[300px] overflow-auto comment-carousel"
        >
          <InfiniteScroll
            dataLength={subAllPostComments.length}
            next={fetchAllPostComments}
            hasMore={hasMoreAllPostCommentsRef.current}
            loader={
              <div className="2xl:mt-[300px] xl:mt-[250px] lg:mt-[200px] sm:mt-[180px] mt-[160px] font-bold xl:text-xl lg:text-lg text-base text-[#f4f4f44d] text-center">
                Loading...
              </div>
            }
            scrollableTarget="carousel-comment"
          >
            {subAllPostComments.map((post_comment: any, index: any) => {
              return (
                <div
                  key={index}
                  className=" bg-[#232323] rounded-[20px] w-fit my-2 p-2"
                >
                  <div className="flex justify-between gap-8">
                    {/* comment_user */}
                    <div className="flex items-center">
                      <Image
                        src={imgSrc(post_comment?.user?.avatar)}
                        width={50}
                        height={50}
                        alt=""
                        className="object-cover rounded-full 2xl:w-[40px] 2xl:h-[40px] xl:w-[35px] md:w-[30px] w-[20px] xl:h-[35px] md:h-[30px] h-[20px]"
                        onError={(e: any) => {
                          e.target.src = "/static/images/user/default.png";
                        }}
                      />
                      <p className="text-white sm:text-[16px] text-[13px] font-semibold font-Inter tracking-[1px] ml-2">
                        {post_comment?.user?.nickname}
                      </p>
                      <p className="text-[#A1A1A1] sm:text-[16px] text-[13px] font-semibold font-Inter tracking-[1px] ml-2">
                        @{post_comment?.user?.name}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 20C4.48372 20 0 15.5163 0 10C0 4.48372 4.48372 0 10 0C15.5163 0 20 4.48372 20 10C20 15.5163 15.5163 20 10 20ZM10 1.39535C5.25581 1.39535 1.39535 5.25581 1.39535 10C1.39535 14.7442 5.25581 18.6047 10 18.6047C14.7442 18.6047 18.6047 14.7442 18.6047 10C18.6047 5.25581 14.7442 1.39535 10 1.39535Z"
                          fill="#F4F4F4"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M13.4508 13.6558C13.3298 13.6558 13.2089 13.6279 13.0973 13.5535L10.2136 11.8326C9.49729 11.4047 8.96706 10.4651 8.96706 9.63723V5.82328C8.96706 5.44189 9.28334 5.12561 9.66473 5.12561C10.0461 5.12561 10.3624 5.44189 10.3624 5.82328V9.63723C10.3624 9.97211 10.6415 10.4651 10.9298 10.6326L13.8136 12.3535C14.1485 12.5489 14.2508 12.9768 14.0554 13.3116C13.9159 13.5349 13.6833 13.6558 13.4508 13.6558Z"
                          fill="#F4F4F4"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p className="text-[#f4f4f44d] sm:text-[15px] text-[13px] ml-1">
                        {moment(post_comment.createdAt).fromNow()}
                      </p>
                    </div>
                    {/* comment_data */}
                  </div>
                  <div
                    key={index}
                    className="preserve-line-breaks text-white pl-2 flex flex-col justify-center break-all xl:text-[18px] lg:text-[14px] sm:text-[12px] text-[14px]"
                  >
                    {post_comment.comment}
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
