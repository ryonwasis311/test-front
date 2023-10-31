import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../../components/Card";
import { ButtonGroup } from "../../contents/Post/ButtonGroup";

const PostPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="lg:flex-row lg:justify-center items-center flex flex-col relative w-full h-full lg:overflow-hidden">
        <div className="lg:w-[20%] md:w-[30%] w-0 h-full">
          <ButtonGroup />
        </div>
        <div className="lg:w-[60%] md:w-[60%] sm:w-[80%] w-[95%] lg:h-full md:h-[90%] h-full">
          <div className="w-full h-full justify-center items-center 2xl:px-[50px] py-[20px]">
            <div className="h-full rounded-[20px] border-[2px] border-solid border-[#5C5C5C] bg-[#212121] flex flex-col">
              {/* header */}
              <div className="flex justify-center items-center mt-5 mb-5">
                <p className="text-white 2xl:text-[30px] xl:text-[28px] sm:text-[24px] text-[18px] font-[500] "> User Management</p>
              </div>
              {/* user infromation */}
              <Card />
            </div>
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
