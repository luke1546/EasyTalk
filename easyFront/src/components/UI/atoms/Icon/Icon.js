import * as React from "react";
import { FaMedal } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { RiChat1Fill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";

const Emoticons = {
  MedalIcon: FaMedal, // 같은 medal 아이콘에 색이 다르게 지정되는건 css에서 지정해야될거같아서 일단 금은동 메달 3개를 medalIcon 하나로 작성
  groupIcon: FaUserGroup,
  warningIcon: IoIosWarning,
  expIcon: RiChat1Fill,
  searchIcon: IoSearchSharp,
  noticeIcon: MdOutlineEventNote,
  commentIcon: FaCommentDots,
};

const Icon = ({ name, color, size }) => {
  const Emoticon = Emoticons[name];
  return Emoticon ? <Emoticon color={color} size={size} /> : null;
};

export default Icon;
