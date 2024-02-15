import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("loginToken") ? true : false,
});
