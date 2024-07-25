export const config: IConfig = {
  data: [
    {
      uin: '-1',
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
    },
  ],
};

export interface ISettingMessageConfig {
  groups: string;

  chats: string;
};

export interface ISettingConfig {
  uin: string;

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

export interface IConfig {
  data: ISettingConfig[];
};