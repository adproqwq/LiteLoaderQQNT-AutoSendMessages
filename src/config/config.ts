export const config: ISettingConfig = {
  messages: {
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
  messages: ISettingMessageConfig;

  groups: string[];

  chats: string[];

  time: string;

  isTodayAction: ISettingIsActionConfig;
};