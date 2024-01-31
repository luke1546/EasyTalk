import { HiBell } from "react-icons/hi";
import { TiHome, TiMicrophoneOutline } from "react-icons/ti";
import { FaRegBookmark, FaBookmark, FaAngleDown, FaRegEdit } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { PiSpeakerHighBold } from "react-icons/pi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { HiMiniMinusCircle } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { LuCopyPlus, LuImagePlus } from "react-icons/lu";
import { FaCalendarCheck } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";

import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDownloading } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const submitBtn = ({ text }) => {
  return (
    <>
      <button>{text}</button>
    </>
  );
};

const basicBtn = ({ text }) => {
  return (
    <>
      <button>{text}</button>
    </>
  );
};

const attendBtn = ({ text }) => {
  return (
    <>
      <button>{text}</button>
    </>
  );
};

const components = {
  bellBtn: HiBell,
  homeBtn: TiHome,
  micCircleBtn: TiMicrophoneOutline,
  bookMarkBtn: FaRegBookmark,
  fBookMarkBtn: FaBookmark,
  shareBtn: FiShare2,
  listenBtn: PiSpeakerHighBold,
  xBtn: IoCloseCircleSharp,
  dropBtn: FaAngleDown,
  editBtn: FaRegEdit,
  delBtn: HiMiniMinusCircle,
  heartBtn: IoIosHeartEmpty,
  fHeartBtn: IoIosHeart,
  leftBtn: FaCircleChevronLeft,
  rigthBtn: FaCircleChevronRight,
  groupEditBtn: FaRegEdit,
  groupCreateBtn: LuCopyPlus,
  impBtn: LuImagePlus,
  checkBtn: FaCalendarCheck,
  wordListBtn: FaPen,
  musicListBtn: BsMusicNoteList,
  sDownloadBtn: MdOutlineFileDownload,
  DownloadBtn: MdOutlineDownloading,
  eDownloadBtn: MdOutlineFileDownloadDone,
  submitBtn: submitBtn,
  basicBtn: basicBtn,
  attendBtn: attendBtn,
};

const Button = ({ name, ...props }) => {
  const Component = components[name];
  return Component ? <Component {...props} /> : null;
};

export default Button;
