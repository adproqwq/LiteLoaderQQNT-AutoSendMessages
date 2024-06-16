export const config: IConfig = {
  data: [
    {
      uin: '-1',
      messages: {
        groups: '',
        chats: '',
      },
      pictures: {
        groups: '',
        chats: '',
      },
      groups: [],
      chats: [],
      time: '',
      isTodayAction: {
        groups: false,
        chats: false,
      },
    },
  ],
};

export interface ISettingMessageConfig {
  groups: string;

  chats: string;
};

export interface ISettingIsActionConfig {
  groups: boolean;

  chats: boolean;
};

export interface ISettingConfig {
  uin: string;

  messages: ISettingMessageConfig;

  pictures: ISettingMessageConfig;

  groups: string[];

  chats: string[];

  time: string;

  isTodayAction: ISettingIsActionConfig;
};

export interface IConfig {
  data: ISettingConfig[];
};