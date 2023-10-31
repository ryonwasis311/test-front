import React, { FC, useEffect, useRef } from "react";
import useState from "react-usestateref";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import NcModal from "../../shared/NcModal/NcModal";
import Image from "next/image";
import ButtonFile from "../../shared/Button/ButtonFile";
import { imgSrc, truncate } from "../../utils";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateAvatar, updateNickName } from "../../store/user";
import { Spin } from "antd";
import { ThreeDots } from "react-loader-spinner";
import { toastNotification } from "../ToastNTF";
import { userService } from "../../services";

export interface ModalSettingProps {
  show: boolean;
  onCloseModalSetting: () => void;
  connected: boolean;
  publicKey: string;
}

const ModalSetting: FC<ModalSettingProps> = ({
  show,
  onCloseModalSetting,
  connected,
  publicKey,
}) => {
  const textareaRef = useRef(null);
  const curUser = useSelector(selectUser);
  const [password, setPssword] = useState("");
  const [email, setEmail] = useState("");

  const [nickname, setName] = useState(curUser.user.nickname || "");
  const [isPass, setIsPass] = useState(true);
  const [isNameEdit, setNameEdit] = useState(false);
  const [isEmailEdit, setisEmailEdit] = useState(false);
  const [newImage, setNewImage] = useState<File>();
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const [editImage, setEditImage] = useState(curUser.user.avatar);
  const hasNumber = /\d/;
  const [isUpdating, setIsUpdating] = useState(false);
  const [invalidName, setInvalidName, invalidNameRef] = useState(false);
  const [invalidEmail, setInvalidEmail, invalidEmailRef] = useState(false);
  const [invalidPass, setInvalidPass, invalidPassRef] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 2400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (nickname !== "" && !nickname.includes("@")) {
      setInvalidName(false);
    }

    if (nickname === "" || nickname.includes("@")) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
  }, [nickname]);

  useEffect(() => {
    if (password.length > 6 && hasNumber.test(password)) {
      setInvalidPass(false);
    }
    if (password.length < 7 || !hasNumber.test(password)) {
      setInvalidPass(true);
    } else {
      setInvalidPass(false);
    }
  }, [password]);

  const setPassType = () => {
    setIsPass(!isPass);
  };

  const onChangeName = async () => {
    if (nickname === "" || nickname.includes("@")) {
      return;
    }
    if (isNameEdit) {
      setIsUpdating(true);

      const newUser = {
        nickname: curUser.user.nickname,
        newName: nickname,
      };
      const data: any = await userService.changeName(newUser);
      if (data.msg === "Username edited success.") {
        dispatch(updateNickName(nickname));
        toastNotification("Username edited success", "success", 5000);
        setIsUpdating(false);
      } else if (data.msg === "Username already exists.") {
        toastNotification("Username already exists.", "error", 5000);
        setIsUpdating(false);
      }
    }
    setNameEdit(!isNameEdit);
  };
  const onChangeEmail = async () => {
    if (isEmailEdit) {
      setIsUpdating(true);

      const newUser = {
        nickname: curUser.user.nickname,
        newName: nickname,
      };
      const data: any = await userService.changeName(newUser);
      if (data.msg === "Username edited success.") {
        dispatch(updateNickName(nickname));
        toastNotification("Username edited success", "success", 5000);
        setIsUpdating(false);
      } else if (data.msg === "Username already exists.") {
        toastNotification("Username already exists.", "error", 5000);
        setIsUpdating(false);
      }
    }
    setNameEdit(!isEmailEdit);
  };

  const onSelectPic = (e: any) => {
    let file = e.target.files[0];
    if (file && file.size < 10000000) {
      setNewImage(file);
      setIsSelectImage(true);
    } else {
    }
  };

  const onChangePic = async () => {
    setIsSelectImage(false);
    if (newImage) {
      setIsUpdating(true);

      const formdata = new FormData();
      if (newImage) {
        formdata.append("name", curUser.user.name);
        formdata.append("avatar", newImage);
      }
      const data: any = await userService.changeAvatar(formdata);
      if (data.msg === "success") {
        toastNotification("Avatar Image edited", "success", 5000);
        dispatch(updateAvatar(`${data.user.avatar}`));
        setEditImage(`${data.user.avatar}`);
      } else {
        toastNotification("Avatar Image error", "error", 5000);
      }
      setIsUpdating(false);
    }
  };

  const onChangePass = async () => {
    if (password.length < 7 || !hasNumber.test(password)) {
      return;
    }
    setIsUpdating(true);

    const newPassword = {
      name: curUser.user.name,
      newPassword: password,
    };
    const data: any = await userService.changePwd(newPassword);
    if (data.msg === "Password edited success.") {
      toastNotification("Password is updated", "success", 5000);
      setIsUpdating(false);
    } else if (data.msg === "Do not use your current password") {
      toastNotification(
        "Password edited error. You are using this password.",
        "error",
        5000
      );
      setIsUpdating(false);
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="grid grid-cols-2 border-b-[2px] border-[#3d3a3a] w-full md:px-[30px] sm:px-[20px] px-[15px] md:py-[20px] py-[20px] md:gap-[40px] sm:gap-[20px] gap-[30px]">
          {/* edit username */}
          <div className="col-span-1 flex justify-center items-center gap-[10px]">
            <div className="flex flex-col items-center justify-center ">
              {/* name inputfield */}
              <div
                className={`2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[100px] 2xl:h-50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center ${!isNameEdit && "cursor-not-allowed"
                  }`}
              >
                <input
                  type="text"
                  readOnly={!isNameEdit ? true : false}
                  className={`placeholder:text-placehd w-full h-full md:px-[15px] sm:px-[10px] px-[7px] rounded-full bg-transparent font-[700] 2xl:text-[24px] xl:text-[22px] sm:text-[19px] text-[15px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center ${!isNameEdit && "pointer-events-none"
                    }`}
                  style={{ textOverflow: "ellipsis" }}
                  value={nickname}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback  z-1"></div>
              </div>
              {/* name validate */}
              <div
                className={` 2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]    `}
                style={{
                  visibility: invalidNameRef.current ? "visible" : "hidden",
                }}
              >
                Name is incorrect
              </div>
            </div>
            {/* edit or update button */}
            <ButtonPrimary
              sizeClass="2xl:w-[74px] sm:w-[60px] w-[50px] 2xl:h-[28px] xl:h-[26px] h-[20px]"
              fontSize="font-Inter font-[600] 2xl:text-[14px] md:text-[10px] text-[6px] tracking-[2px]"
              className={`sm:rounded-[14px] rounded-[8px] z-10 2xl:mb-5 xl:mb-[18px] lg:mb-[20px] sm:mb-[20px] mb-[20px] ${nickname === "" && "pointer-events-none opacity-50"
                }`}
              onClick={onChangeName}
            >
              {isNameEdit ? "UPDATE" : "EDIT"}
            </ButtonPrimary>
          </div>
          {/* edit email */}
          <div className="col-span-1 flex justify-center items-center gap-[10px]">
            <div className="flex flex-col items-center justify-center ">
              {/* email inputfield */}
              <div
                className={`2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[100px] 2xl:h-50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center ${!isNameEdit && "cursor-not-allowed"
                  }`}
              >
                <input
                  type="text"
                  readOnly={!isNameEdit ? true : false}
                  className={`placeholder:text-placehd w-full h-full md:px-[15px] sm:px-[10px] px-[7px] rounded-full bg-transparent font-[700] 2xl:text-[24px] xl:text-[22px] sm:text-[19px] text-[15px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center ${!isNameEdit && "pointer-events-none"
                    }`}
                  style={{ textOverflow: "ellipsis" }}
                  value={email}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback  z-1"></div>
              </div>
              {/* email validate */}
              <div
                className={` 2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]    `}
                style={{
                  visibility: invalidNameRef.current ? "visible" : "hidden",
                }}
              >
                Email is incorrect
              </div>
            </div>
            {/* edit or update button */}
            <ButtonPrimary
              sizeClass="2xl:w-[74px] sm:w-[60px] w-[50px] 2xl:h-[28px] xl:h-[26px] h-[20px]"
              fontSize="font-Inter font-[600] 2xl:text-[14px] md:text-[10px] text-[6px] tracking-[2px]"
              className={`sm:rounded-[14px] rounded-[8px] z-10 2xl:mb-5 xl:mb-[18px] lg:mb-[20px] sm:mb-[20px] mb-[20px] ${nickname === "" && "pointer-events-none opacity-50"
                }`}
              onClick={onChangeEmail}
            >
              {isNameEdit ? "UPDATE" : "EDIT"}
            </ButtonPrimary>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b-[2px] border-[#3d3a3a] w-full md:px-[30px] sm:px-[20px] px-[15px] 2xl:py-[30px] md:py-[20px] py-[20px] md:gap-[40px] sm:gap-[20px] gap-[30px]">
          <div className="col-span-1 flex justify-center gap-[10px]">
            <div className="flex flex-col items-center justify-center">
              <div className="2xl:w-[190px] xl:w-[160px] lg:w-[140px] md:w-[120px] sm:w-[100px] w-[80px] 2xl:h-[50px] lg:h-[40px] md:h-[35px] h-[30px] px-[16px] pt-[7px] relative flex justify-center items-center">
                <input
                  id="pass"
                  type={`${isPass ? "password" : "text"}`}
                  className="px-[15px] placeholder:text-placehd w-full h-full rounded-full bg-transparent font-[700] 2xl:text-[24px] xl:text-[20px] sm:text-[19px] text-[15px] text-white text-center absolute top-0 left-0 z-10 flex justify-center items-center"
                  value={password}
                  onChange={(e: any) => {
                    setPssword(e.target.value);
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 rounded-full bg-formback z-1"></div>
              </div>
              {/* password validate */}
              <div
                className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa]`}
                style={{
                  visibility: invalidPassRef.current ? "visible" : "hidden",
                }}
              >
                min 7 letters and 1 number
              </div>
              {/* change password button */}
              <ButtonPrimary
                sizeClass="2xl:w-[160px] xl:w-[140px] md:w-[120px] sm:w-[90px] w-[80px] 2xl:h-[34px] xl:h-[32px] h-[30px]"
                fontSize="font-Inter font-[600] 2xl:text-[14px] md:text-[10px] text-[6px]text-placehd2"
                className={`rounded-[14px] z-10 mt-[10px] flex justify-center ${password === "" && "pointer-events-none opacity-50"
                  }`}
                onClick={onChangePass}
              >
                <p className="xl:text-[10px] lg:text-[8px] sm:text-[7px] text-[5px]">
                  CHANGE PASSWORD
                </p>
              </ButtonPrimary>
            </div>
            {/* show or hide button */}
            <ButtonPrimary
              sizeClass="2xl:w-[74px] sm:w-[60px] w-[50px] 2xl:h-[28px] h-[20px] 2xl:mt-[12px] xl:mt-[8px] lg:mt-[10px] sm:mt-[4px] mt-[4px]"
              fontSize="font-Inter font-[600] 2xl:text-[14px] text-[8px] tracking-[2px]"
              className={`rounded-[14px] z-10  ${password === "" && "pointer-events-none opacity-50"
                }`}
              onClick={setPassType}
            >
              {isPass ? "SHOW" : "HIDE"}
            </ButtonPrimary>
          </div>
        </div>

        <div className="w-full h-[250px] px-[12px] py-[12px]">
          <div
            className="w-full h-full rounded-[40px] blur-[4px]"
            style={{ backgroundColor: "rgba(30, 30, 30, 0.6)" }}
          ></div>
        </div>
        {isUpdating && (
          <div className="absolute top-[40%] left-0 right-0 ml-auto mr-auto w-fit">
            <ThreeDots height={100} width={100} color="#616161" />
          </div>
        )}
      </>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalSetting}
      contentExtraClass="max-w-[700px] xl:w-[700px] lg:w-[600px] sm:w-[500px] w-[330px] 2xl:h-[670px] xl:h-[600px] md:h-[570px] h-[400px]"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="ADMIN SETTINGS"
    />
  );
};

export default ModalSetting;
