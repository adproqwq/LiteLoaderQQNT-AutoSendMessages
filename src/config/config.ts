export const config: ISettingConfig = {
  mode: 'white',
  messages: {
    groups: '',
    chats: '',
  },
  pictures: {
    groups: '',
    chats: '',
  },
  groups: [],
  targets: [],
  chats: [],
  sendTime: '',
  lastActTime: '',
  isAct: false,
};

export interface ISettingMessageConfig {
  groups: string;

  chats: string;
};

export interface ISettingConfig {
  mode: 'black' | 'white';

  messages: ISettingMessageConfig;

  pictures: ISettingMessageConfig;

  groups: string[];

  targets: string[];

  chats: string[];

  sendTime: string;

  lastActTime: string;

  isAct: boolean;
};