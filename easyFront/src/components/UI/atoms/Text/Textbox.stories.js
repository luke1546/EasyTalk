import { Textbox } from './Textbox';

export default {
  component: Textbox,
  title: 'UI/atoms/Text/Textbox',
};

export const Notice = {
  args: {
    section: 'noticeText',
    context1: 'notice'
  },
};

export const Double = {
  args: {
    section: 'doubleText',
    context1: 'double',
    context2: 'text',
  },
};

export const Single = {
  args: {
    section: 'singleText',
    context1: 'single'
  },
};

export const Logo = {
  args: {
    section: 'logoText',
    context1: '쉽게말해'
  },
};

export const Accept = {
  args: {
    section: 'acceptText',
    context1: '수락'
  },
};

export const Cancel = {
  args: {
    section: 'cancelText',
    context1: '취소'
  },
};

export const Deny = {
  args: {
    section: 'denyText',
    context1: '거절'
  },
};